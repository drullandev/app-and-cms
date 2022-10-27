import React, { useEffect, useState } from 'react'
import { IonTabButton, IonLabel } from '@ionic/react'

import { TabButtonProps } from './interfaces/TabButtonProps'

import { restGet } from '../../../data/app/storage'

import Icon from './Icon'

/**
 * 
 * @returns 
 */
const TabButton: React.FC = (tab:any) => {  
  console.log('tab param TabButton', tab)
  const [path, setPath] = useState()
  useEffect(() => {
    restGet('paths', { slug: tab.path.slug })
      .then(res => {
        //console.log('loaded TabButton', res.data)
        setPath(res.data)
      })
      .catch(err => { console.log(err) })
  }, [])

//  console.log('TabButton', tab)

  return <IonTabButton key={tab.path.slug + '-tab'} tab={tab.path.slug} href={tab.path.value}>
    <Icon slot='start' name={tab.icon} />
    <IonLabel>{tab.label}</IonLabel>
  </IonTabButton>
}

export default TabButton