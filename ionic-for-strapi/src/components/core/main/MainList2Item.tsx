//import * as AppConst from '../../../static/constants'

import React, { useRef, useEffect, useState } from 'react'
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonSkeletonText, IonThumbnail } from '@ionic/react'
import { connect } from '../../../data/connect'
import { restGet } from '../../../data/utils/rest/rest.utils'

import Icon from './Icon'
 
interface LineProps {
  id: string,
  content: string,
  created_at: string,
  published_at: string,
}

interface OwnProps {
  row: ListRow;
  //timestamp: number
}

interface StateProps {
  //favoriteSessions: number[]
  searchString?: string
}

interface DispatchProps {
  //addFavorite: typeof addFavorite
  //removeFavorite: typeof removeFavorite
}

interface SessionListItemProps extends OwnProps, StateProps, DispatchProps { }

const SessionListItem: React.FC<SessionListItemProps> = ({ row, searchString }) => {
  
  const [line, setLine] = useState<LineProps>()

  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)

  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close()
  }

  useEffect(()=>{
    restGet('user-contents', { id: row.id })
    .then(res=>{
      //console.log(res)
      switch(res.status){
        case 200:
          setLine(res.data[0])
          break
        default:
          //setLine()
          break
      }
    }).catch(res=>{
      console.log(res)
    })

  },[row.id, searchString])

  /*
  const removeFavoriteSession = () => {
    onAddFavorite(session.id);
    onShowAlert('Favorite already added', [
      {
        text: 'Cancel',
        handler: dismissAlert
      },
      {
        text: 'Remove',
        handler: () => {
          onRemoveFavorite(session.id);
          dismissAlert();
        }
      }
    ]);
  }

  const addFavoriteSession = () => {
    if (isFavorite) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      removeFavoriteSession();
    } else {
      // remember this session as a user favorite
      onAddFavorite(session.id);
      onShowAlert('Favorite Added', [
        {
          text: 'OK',
          handler: dismissAlert
        }
      ]);
    }
  };
  */

  const removeLine = () =>{
    console.log('You pretend to remove this from the list or including from the database ^^')
  }
  
  const putTimeline = (line:any) => {
    return <p>{line.created_at}&mdash;&nbsp;{line.published_at}&mdash;&nbsp;{line.published_at}</p>
  }

  const putContent = (line:any) => {
    return <h3>{line.id+' - '+line.content}</h3>
  }

  return line 
  ? <IonItemSliding ref={ionItemSlidingRef} class={'track-'+row.id} >    
      <IonItem routerLink={`/tabs/list/asdfasdfas/${line.id}`}>
        <IonLabel>
          {putContent(line)}
          {putTimeline(line)}
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption color="danger" onClick={((e:any)=>{console.log(e)})}><Icon slot='' name='trashoutline'/></IonItemOption>
        <IonItemOption color="favorite" onClick={((e:any)=>{console.log(e)})}><Icon slot='' name='staroutline'/></IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  : <IonItem>
      <IonThumbnail slot="start">
        <IonSkeletonText animated />
      </IonThumbnail>
      <IonLabel>
        <h3><IonSkeletonText animated style={{ width: '50%' }} /></h3>
        <p><IonSkeletonText animated style={{ width: '80%' }} /></p>
        <p><IonSkeletonText animated style={{ width: '60%' }} /></p>
      </IonLabel>
    </IonItem>      
}


export default connect<OwnProps, StateProps, DispatchProps>({

  mapStateToProps: (state) => ({
    searchString: state.data.searchString
    //favoriteSessions: state.listData.favorites
  }),

  mapDispatchToProps: ({
    //addFavorite,
    //removeFavorite
  }),

  component: SessionListItem
  
})