import * as AppConst from '../../../static/constants'

import { IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonRefresher, IonRefresherContent, useIonToast } from '@ionic/react'
import React, { useState, useEffect, useRef } from 'react'
import { restGet, getGQL } from '../../../data/utils/rest/rest.utils'

import { connect } from '../../../data/connect'

import { toCamelCase } from '../../../data/utils/common'

import { setSearchString, setSearchOrder, setOrderField, setFilter } from '../../../data/sessions/sessions.actions';
import Spinner from './Spinner'

interface OwnProps { }
interface StateProps {
  searchString?: string
  searchOrder: 'asc' | 'desc'
  orderField: 'published_at' | string
  filter: []
}
interface DispatchProps {
  setSearchString: typeof setSearchString
  setSearchOrder: typeof setSearchOrder
  setOrderField: typeof setOrderField
  setFilter: typeof setFilter
}

interface ThisProps extends OwnProps, StateProps, DispatchProps { }

const MainList: React.FC<ThisProps> = ({
  searchString,
  searchOrder,
  orderField,
  setFilter, filter
}) => {

  // List params!!! TODO: Move to params jeje!!
  const slug = 'user-contents'
  const [page, setPage] = useState(0)  
  const [maxPage, setMaxPage] = useState(1)  
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null)

  const [listData, setListData] = useState<[]>([])
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false)

  const [setToast, dismissToast] = useIonToast()

  const getDataToCall = () => {
    return { 
      model: toCamelCase(slug),
      slug: slug,
      paginator : {
        limit: AppConst.paginator.size,
        start: 0,
      },
      direction: AppConst.filter.order.default,
      where: [{
        type: 'string',
        key: 'content',
        action: 'contains',
        value: searchString
      }],
      searchString: searchString ? searchString : '', 
      orderField: orderField ? orderField : AppConst.filter.fields.default,  
      searchOrder: searchOrder ? searchOrder : AppConst.filter.order.default,
      filter: [],
      struct: {
        id: '',
        published_at: 'date',
        created_at: 'date',
        content: 'string',
        user : {
          id : 'number', 
          username: 'string',
          role: {
            id :'number'
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
    }
  }

  const launchToast = (header:string, message: string, color: string = 'light', position: 'top' | 'bottom' | 'middle' = 'bottom', duration: number = 3000) => {
    dismissToast()
    setToast({
      header: header,
      buttons: [{ text: 'x', handler: () => dismissToast() }],
      position: position,
      color: color,
      message: message,
      duration: duration,
      animated: true
    })
  }

  // Count max pages to avoid get out of range
  useEffect(()=>{
    let dataCall = getDataToCall()
    restGet(dataCall.slug+'/count')
    .then(res=>{
      setMaxPage(Math.floor( res.data / AppConst.paginator.size ))
    })
  },[])

  // Push the selected page data set by pagenumber
  const pushPage = (page:number) => {

    let dataCall = getDataToCall()
    dataCall.paginator.start = AppConst.paginator.size * page

    getGQL(dataCall)
    .then(res=>{
      switch(res.status){
        case 200:          
          appendData(listData, res.data.data)
          setPage(page)
        break
        default:
          //console.log('Opps!!', dataCall, res)
          launchToast('Oppps!!!',JSON.stringify(res))
          break
      }
    })
    .catch((res: any)=>{
      //console.log('Opps!!', dataCall, res)
      launchToast('Oppps!!!',JSON.stringify(res))
    })

  }
  
  // Push the selected page data set
  useEffect(()=>{
    pushPage(page)
  },[page])

  const reloadData = () =>{
    setListData([])
  }
  
  // Push the selected page data set
  useEffect(()=>{
    pushPage(0)
  },[searchString, searchOrder, orderField])

  const appendData = (listData: any, data:any) =>{
    var resData = data[Object.keys(data)[0]]
    const newData = listData ? listData : []
    for (let i = 0; i < AppConst.paginator.size; i++) {
      newData.push(resData[i])
    }
    setListData(newData)
  }

  const pushNextPage = (ev: any) => {    
    setTimeout(() => {
      var newPage = page+1
      if(newPage === maxPage){
        setInfiniteDisabled(true)
        return false
      }else{
        pushPage(newPage)
        ev.target.complete()
      }
    }, AppConst.timeout.refresh)
  }  

  const putTimeBar = (date: string = '') =>{
    var now = new Date(date)
    let current = now.toDateString()
    return <IonLabel>{current}</IonLabel>
  }

  const putABar = (listData: any) => {
    if(false){
      return putTimeBar(listData.published_at)
    }else{
      return listData 
      ? 
        <IonItem routerLink={`/tabs/list/asdfasdfas/${listData.id}`}>
          <IonLabel>
            {putContent(listData)}
            {putTimeline(listData)}
          </IonLabel>
        </IonItem>

      : <Spinner name='bubbles'/>
    }     
  }
    
  const putTimeline = (line:any) => {
    return <p>{line.created_at}&mdash;&nbsp;{line.published_at}&mdash;&nbsp;{line.published_at}</p>
  }

  const putContent = (line:any) => {
    return <h3>{line.id+' - '+line.content}</h3>
  }

  return <>

    <IonRefresher slot='fixed' ref={ionRefresherRef} onIonRefresh={reloadData}>
      <IonRefresherContent />
    </IonRefresher>

    <IonList>
      {Object.keys(listData).map((row:any, index: number)=>(
        putABar(listData[index])  
      ))}    
    </IonList>

    <IonInfiniteScroll
      threshold='100px'
      onIonInfinite={pushNextPage}
      disabled={isInfiniteDisabled}
    >
      <IonInfiniteScrollContent
        loadingSpinner={getDataToCall().content.spinner}
        loadingText={getDataToCall().content.content}
      ></IonInfiniteScrollContent>
    </IonInfiniteScroll>
   {/* 
    <IonButton  expand='block' onClick={(e: any)=>{reloadList(e)}}>Reload list</IonButton>
    <IonButton  expand='block' onClick={(e: any)=>{pushNextPage(e)}}>Call Next Page</IonButton>
    */}

  </>

}

export default connect<ThisProps>({
  mapStateToProps: (state) => ({
    searchString: state.data.searchString,
    searchOrder: state.data.searchOrder,
    orderField: state.data.orderField,
    filter: state.data.filter
  }),
  mapDispatchToProps: ({
    setSearchString,
    setSearchOrder,
    setOrderField,
    setFilter
  }),
  component: MainList  
})