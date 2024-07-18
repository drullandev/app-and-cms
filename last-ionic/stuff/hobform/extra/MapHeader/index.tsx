import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { IonItem, IonSelect, IonSelectOption, IonImg, IonLoading, IonHeader, IonToolbar, IonGrid, IonCol, IonRow, IonIcon } from '@ionic/react'
import { MenuProps } from '../../../data/models/Menu'
import { useHistory } from 'react-router'
import { setStorage, getStorage } from '../../../data/utils/storage'
import { Route } from '../../../data/models/Route'
import { useTranslation } from 'react-i18next'
import { chevronBackOutline } from 'ionicons/icons'
import { apiUrl, homeHref, translations } from '../../../../env'

interface MapHeaderProps {
  selected?: string,
  setSelected: any
}

const MapHeader: React.FC<MapHeaderProps> = ({ selected, setSelected }) => {

  const { t } = useTranslation()
  const history = useHistory()
  const [menu, setMenu] = useState<MenuProps>()
  const [routes, setRoutes] = useState<Route[]>([])

  let actions = useMemo(()=> {
  return {

    load: () => {
      getStorage('menu_navigate').then(setMenu)
      getStorage('creator:id')
        .then((creator_id)=>{
          if (creator_id) {
            getStorage('routes_' + creator_id)
              .then(setRoutes)
          }
        })
      getStorage('selected').then(selected => {
        setSelected(selected)
      })
    },

    clickChange: (par: number) => {
      setStorage('selected', par)
      setSelected(par)
      history.replace('/map/navigate/' + par)
    },

    goHome: () => history.replace(homeHref),
  }

}, [history, setSelected])

const MemoizedRouteSelector = useCallback(() => (
  <IonItem className='route-selector-container'>
    <IonSelect
      key='selector_routes'
      className='route-selector'
      interface='action-sheet'
      value={Number(selected)}
      onIonChange={(e: any) => actions.clickChange(e.detail.value)}>
      <IonSelectOption key='first_option' value={0} className='bold'>{t(translations.routeSelDef)}</IonSelectOption>
      {routes && routes.map((r: any) =>
        <IonSelectOption key={'selecte-route-option-' + r.id} className='bold' value={r.id}>{r.name}</IonSelectOption>
      )}
    </IonSelect>
  </IonItem>
), [routes, selected, actions, t])

useEffect(()=>{actions.load()}, [actions])

return <IonHeader className='border-none'>

  <IonToolbar>

    <IonGrid>

      <IonRow >

        <IonCol size='1' style={{ margin: '1vh 0' }}>
          <IonIcon size='large' icon={chevronBackOutline} onClick={actions.goHome} />
        </IonCol>

        <IonCol size='2'>
          {menu ? <IonImg
            className='fade-in-2'
            style={{ width: '50px', maxHeight: '3vh' }}
            key='the_one'
            src={apiUrl + menu.icon.url}
            alt=''
          /> : <IonLoading isOpen={false} />}
        </IonCol>

        <IonCol size='9'>
          <MemoizedRouteSelector />
        </IonCol>

      </IonRow>

    </IonGrid>

  </IonToolbar>

</IonHeader>

}

export default React.memo(MapHeader)