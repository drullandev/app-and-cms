import React from 'react'
import { IonMenuToggle, IonIcon, IonItem, IonLabel } from '@ionic/react'

import { ListProps } from '../interfaces/ListProps'
import { ListRowProps } from '../reducer/models/ListRowProps'

const List: React.FC<ListProps> = (rows) => {
  return (<></>)// rows.map((row: ListRowProps) => (
  /* <IonMenuToggle key={row.title} auto-hide='false'>
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
 ))*/
}

export default List