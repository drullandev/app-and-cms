import React, { useEffect, useState } from 'react'
import { IonContent, IonImg, IonLabel, IonTextarea } from '@ionic/react'

import { restGet, setImage } from '../../../data/utils/rest/rest.utils'

export interface ContentProps {
  row: {
    slug:string
  }
}

const Content: React.FC<ContentProps> = ({row}) => {
  //console.log('setContent', row)
  const [content, setContent] = useState([])
  const [image, setThisImage] = useState('')
  
  useEffect(()=>{
    restGet('contents', { slug: row.slug })
    .then(res => {
      //console.log('contents', res)
      setThisImage(setImage(res.data[0].caret.url))
      setContent(res.data[0])
    }).catch(res=>{
      console.log('error', res)
    })
  },[])
  
  return <IonContent>
    <IonLabel color='primary'>{content.title}</IonLabel>
    <IonImg src={image}></IonImg>
    <IonTextarea>{content.content}</IonTextarea>
  </IonContent>

}

export default Content