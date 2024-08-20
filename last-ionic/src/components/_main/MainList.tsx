import { IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonAlert, AlertButton } from '@ionic/react';
import React, { useState, useCallback } from 'react';
import { Schedule, Session } from '../../stores/models/Schedule';
import SessionListItem from './MainListItem';
import useStore from '../../stores/user.store';
import useSessionStore from '../../stores/sessions.store';
import { SessionGroup } from '../../stores/models/SessionGroup copy';

interface OwnProps {
  schedule: Schedule;
  listType: 'all' | 'favorites';
  hide: boolean;
}

const SessionList: React.FC<OwnProps> = ({ schedule, listType, hide }) => {
  
  const { favoriteSessions } = useStore();  
  const { addFavorite, removeFavorite } = useSessionStore();

  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([]);

  const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
    setAlertHeader(header);
    setAlertButtons(buttons);
    setShowAlert(true);
  }, []);

  if (schedule.groups.length === 0 && !hide) {
    return (
      <IonList>
        <IonListHeader>
          No Sessions Groups Found
        </IonListHeader>
      </IonList>
    );
  }

  return (
    <>
      <IonList style={hide ? { display: 'none' } : {}}>
        {schedule.groups.map((group: any, index: number) => (
          <IonItemGroup key={`group-${index}`}>
            <IonItemDivider sticky>
              <IonLabel>{group.time}</IonLabel>
            </IonItemDivider>
            {group.sessions.map((session: Session, sessionIndex: number) => (
              <SessionListItem
                onShowAlert={handleShowAlert}
                isFavorite={favoriteSessions.includes(session.id)}
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
      />
    </>
  );
};

export default SessionList;
