import React, { useEffect, useState } from 'react'
import { IonList, IonLabel, IonListHeader } from '@ionic/react'
import { restGet } from '../../../data/utils/rest/rest.utils'

import { SubMenuProps } from './interfaces/SubMenuProps'

import MenuRow from './MenuRow'

const SubMenu: React.FC<SubMenuProps> = ({ menu }) => {

  //console.log('setSubMenu', menu.menu.slug) 
  const [menus, setMenus] = useState<any[]>([])
  useEffect(() => {
    restGet('menus', { slug: menu.menu.slug })
      .then(res => {
        //console.log('SubMenu::Res', res.data[0])
        if (res.data[0].rows) setMenus(res.data[0].rows)
      })
  }, [menu.menu.slug])

  //console.log('SubMenu', { menus })
  return (
    <>
      <IonListHeader>
        <IonLabel>{menu.title}</IonLabel>
      </IonListHeader>
      <IonList lines='none' key={menu.menu.slug}>
        {menus.map((row:any, i:number)=>(
          <MenuRow key={i.toString()} row={row}/>
        ))}
      </IonList>
    </>
  )

}

export default SubMenu