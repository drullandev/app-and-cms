import React from 'react'
import { IonAlert } from '@ionic/react'

export interface AlertProps {
  slug: string
  showAlert: boolean
}

const Alert: React.FC<AlertProps> = ({ slug, showAlert}) => (
  <IonAlert
    isOpen={showAlert}
    header="Change Username"
    buttons={[
      'Cancel',
      {
        text: 'Ok',
        handler: (data) => {
          //setNickname(data.username);
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
    onDidDismiss={() => console.log() //setShowAlert(false)
  }
  />
)

export default Alert