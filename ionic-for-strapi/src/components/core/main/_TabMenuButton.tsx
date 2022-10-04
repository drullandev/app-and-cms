import React, { useEffect, useState } from 'react'
import { IonTabButton, IonLabel } from '@ionic/react'
import { restGet } from '../../../data/utils/rest/rest.utils'

import Icon from './Icon'

const TabMenuButton: React.FC<any> = () => {
  console.log('I CANNOT ENTER TO THIS COMPONENT AND I CANT UNDERSTAND WHY!!!')
  return <></>
  /*console.log('puta tab', tab)

  const [path, setPath] = useState()
  useEffect(() => {
    restGet('paths', { slug: tab.path.slug })
      .then(res => {
        console.log('loaded TabMenuButton', res.data)
        setPath(res.data)
      })
      .catch(err => { console.log(err) })
  }, [])

  console.log('TabMenuButton', tab)

  return path 
    ? <IonTabButton key={tab.path.slug + '-tab'} tab={tab.path.slug} href={tab.path.value}>
      <Icon name={tab.icon} />
      <IonLabel>{tab.label}</IonLabel>
    </IonTabButton>
    : <></>*/

}

export default TabMenuButton