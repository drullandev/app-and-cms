import * as AppConst from '../../app/config/env';
import { GraphQLFilter } from '../../classes/assets/GraphQLFilter';
import { IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonRefresher, IonRefresherContent, useIonToast } from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';
import Spinner from './Spinner';
import useSearchStore from '../../classes/stores/searcher.store'; // Import the new search store

const MainList: React.FC = () => {
  const { searchString, searchOrder, orderField, filter, setSearchString, setSearchOrder, setOrderField, setFilter } = useSearchStore();

  // List params!!! TODO: Move to params jeje!!
  const slug = 'user-contents';
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);

  const [listData, setListData] = useState<any[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const [setToast, dismissToast] = useIonToast();

  const getDataToCall = () => {
    return {
      model: slug,
      slug: slug,
      paginator: {
        limit: AppConst.paginator.size,
        start: 0,
      },
      direction: searchOrder,
      where: [{
        type: 'string',
        key: 'content',
        action: 'contains',
        value: searchString
      }],
      searchString: searchString ? searchString : '',
      orderField: orderField ? orderField : GraphQLFilter.fields.default,
      searchOrder: searchOrder ? searchOrder : GraphQLFilter.order.default,
      filter: filter, // Use filter from search store
      struct: {
        id: '',
        published_at: 'date',
        created_at: 'date',
        content: 'string',
        user: {
          id: 'number',
          username: 'string',
          role: {
            id: 'number'
          },
          avatar: {
            id: 'number'
          }
        }
      },
      content: {
        spinner: 'dots',
        content: 'Loading more listData...'
      }
    };
  };

  const launchToast = (header: string, message: string, color: string = 'light', position: 'top' | 'bottom' | 'middle' = 'bottom', duration: number = 3000) => {
    dismissToast();
    setToast({
      header: header,
      buttons: [{ text: 'x', handler: () => dismissToast() }],
      position: position,
      color: color,
      message: message,
      duration: duration,
      animated: true
    });
  };

  useEffect(() => {
    let dataCall = getDataToCall();
    // Simulating data fetch for maxPage calculation
    /*
    restGet(dataCall.slug+'/count')
    .then(res=>{
      setMaxPage(Math.floor( res.data / AppConst.paginator.size ))
    })
    */
  }, []);

  const pushPage = (page: number) => {
    let dataCall = getDataToCall();
    dataCall.paginator.start = AppConst.paginator.size * page;
    /*
    getGQL(dataCall)
    .then(res=>{
      switch(res.status){
        case 200:
          appendData(listData, res.data.data);
          setPage(page);
        break;
        default:
          launchToast('Oppps!!!', JSON.stringify(res));
          break;
      }
    })
    .catch((res: any) => {
      launchToast('Oppps!!!', JSON.stringify(res));
    })
    */
  };

  useEffect(() => {
    pushPage(page);
  }, [page]);

  const reloadData = () => {
    setListData([]);
  };

  useEffect(() => {
    pushPage(0);
  }, [searchString, searchOrder, orderField]);

  const appendData = (listData: any[], data: any) => {
    var resData = data[Object.keys(data)[0]];
    const newData = listData ? listData : [];
    for (let i = 0; i < AppConst.paginator.size; i++) {
      newData.push(resData[i]);
    }
    setListData(newData);
  };

  const pushNextPage = (ev: any) => {
    setTimeout(() => {
      var newPage = page + 1;
      if (newPage === maxPage) {
        setInfiniteDisabled(true);
        return false;
      } else {
        pushPage(newPage);
        ev.target.complete();
      }
    }, AppConst.timeout.refresh);
  };

  const putTimeBar = (date: string = '') => {
    var now = new Date(date);
    let current = now.toDateString();
    return <IonLabel>{current}</IonLabel>;
  };

  const putABar = (listData: any) => {
    if (false) {
      return putTimeBar(listData.published_at);
    } else {
      return listData
        ? <IonItem routerLink={`/tabs/list/asdfasdfas/${listData.id}`}>
            <IonLabel>
              {putContent(listData)}
              {putTimeline(listData)}
            </IonLabel>
          </IonItem>
        : <Spinner name='bubbles'/>;
    }
  };

  const putTimeline = (line: any) => {
    return <p>{line.created_at}&mdash;&nbsp;{line.published_at}&mdash;&nbsp;{line.published_at}</p>;
  };

  const putContent = (line: any) => {
    return <h3>{line.id + ' - ' + line.content}</h3>;
  };

  return (
    <>
      <IonRefresher slot='fixed' ref={ionRefresherRef} onIonRefresh={reloadData}>
        <IonRefresherContent />
      </IonRefresher>

      <IonList>
        {listData.map((row: any, index: number) => (
          putABar(listData[index])
        ))}
      </IonList>

      <IonInfiniteScroll
        threshold='100px'
        onIonInfinite={pushNextPage}
        disabled={isInfiniteDisabled}
      >
        <IonInfiniteScrollContent
          loadingText={getDataToCall().content.content}
        />
      </IonInfiniteScroll>
    </>
  );
};

export default MainList;