import * as AppConst from '../../config/env'

import { IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonAlert, AlertButton } from '@ionic/react'
import React, { useState, useCallback } from 'react'

import { Home, Session } from '../../stores/models/Schedule'
import SessionListItem from './SessionListItem'

import useUserStore from '../../stores/user.store'

const SessionList: React.FC<any> = ({ hide, listType }) => {

  const [showAlert, setShowAlert] = useState(false)
  const [alertHeader, setAlertHeader] = useState('')
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([])
  const { schedule, addFavorite, removeFavorite, favoriteSessions } = useUserStore()
  const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
    setAlertHeader(header)
    setAlertButtons(buttons)
    setShowAlert(true)
    console.log('is schedule here?', schedule)
  }, [])

  if (schedule.groups.length === 0 && !hide) (
    <IonList>
      <IonListHeader>
        No Sessions Groups Found
      </IonListHeader>
    </IonList>
  )

  return <>
    <IonList style={hide ? { display: 'none' } : {}}>

      {schedule.groups.map((group, index: number) => (

        <IonItemGroup key={`group-${index}`}>

          <IonItemDivider sticky>
            <IonLabel>
              {group.time}
            </IonLabel>
          </IonItemDivider>

          {group.sessions.map((session: Session, sessionIndex: number) => (
            <SessionListItem
              onShowAlert={handleShowAlert}
              isFavorite={favoriteSessions.indexOf(session.id) > -1}
              onAddFavorite={addFavorite}
              onRemoveFavorite={removeFavorite}
              key={`group-${index}-${sessionIndex}`}
              session={session}
              listType={listType}
            />
          ))}

        </IonItemGroup>

      ))}

    </IonList>

    <IonAlert
      isOpen={showAlert}
      header={alertHeader}
      buttons={alertButtons}
      onDidDismiss={() => setShowAlert(false)}
    ></IonAlert>

  </>

}

export default  SessionList;
