//import * as AppConst from '../../static/constants'

import React from 'react'
import { IonMenuToggle, IonIcon, IonItem, IonLabel } from '@ionic/react'
import { ListRowProps } from './interfaces/ListRowProps'

const ListRow: React.FC<ListRowProps> = (row) => (
  //(isLoggedIn === false && p.roles.find(el => el.name === 'Public' && el.allowed === true) ) ||
  //(isLoggedIn === true && p.roles.find(el => el.name === 'Authenticated' && el.allowed === true) ) 
  //?
  <IonMenuToggle key={row.title} auto-hide='false'>
    <IonItem
      key={row.title}
      detail={false}
      routerLink={row.path}
      routerDirection='none'
      className={window.location.pathname.startsWith(row.path) ? 'selected' : undefined}
    >
      <IonIcon slot={row.slot} icon={row.icon} />
      <IonLabel>{row.title}</IonLabel>
    </IonItem>
  </IonMenuToggle>
)

export default ListRow