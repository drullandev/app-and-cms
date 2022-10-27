import React from 'react'
import { IonAlert } from '@ionic/react'

export interface AlertProps {
  slug: string

}

const Alert: React.FC<AlertProps> = ({ slug }) => (
  <IonAlert
    isOpen={showAlert}
    header="Change Username"
    buttons={[
      'Cancel',
      {
        text: 'Ok',
        handler: (data) => {
          setNickname(data.username);
        }
      }
    ]}
    inputs={[
      {
        type: 'text',
        name: 'username',
        value: 'fghjghfghjghjhg',
        placeholder: 'username'
      }
    ]}
    onDidDismiss={() => setShowAlert(false)}
  />
)

export default Alert