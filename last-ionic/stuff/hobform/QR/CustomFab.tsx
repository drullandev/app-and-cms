import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react"
import React from "react"

import { addOutline, cameraOutline, qrCodeOutline } from "ionicons/icons"
import { CustomFabProps } from './types'

const CustomFab: React.FC<CustomFabProps> = ({ start }) => {

	return (

    <IonFab vertical="bottom" horizontal="end" slot="fixed" className="ion-padding-bottom ion-padding-end">
      <IonFabButton>
        <IonIcon icon={ qrCodeOutline } />
      </IonFabButton>

        <IonFabList side="top" className="ion-padding-bottom">
          <IonFabButton color="primary" onClick={ ()=> start }>
            <IonIcon icon={ cameraOutline } />
          </IonFabButton>

          <IonFabButton color="primary" routerLink="/manual">
            <IonIcon icon={ addOutline } />
          </IonFabButton>
        </IonFabList>
    </IonFab>
	)

}

export default React.memo(CustomFab)