import * as AppConst from '../../../static/constants'

import React, { FC ,useState } from 'react'
import { IonLabel, IonButton, IonSpinner, IonItem, IonSkeletonText } from '@ionic/react'
import { ButtonProps } from './interfaces/ButtonProps'

const style = { marginTop: '20px' }





const Button: FC<ButtonProps> = ({  label, button }) => {

  const spinner = {
    type: 'lines-small',
    position: 'left', //Now only left ^^
    display: { true: 'inline', false: 'none' }
  }

  const [display, setDisplay] = useState<any>(spinner.display.false)

  const setActive = async (timeout: number = AppConst.timeout.refresh) => {
    setDisplay(spinner.display.true)
    setInactive(timeout)
  }

  const setInactive = async (timeout: number = AppConst.timeout.buttonSpinner) => {
    setTimeout(()=>{
      setDisplay(spinner.display.false)
    },timeout)
  }

  const buttonContent = (label: string, spinner: any) => (
    <>
      <IonSpinner style={{display: display}}
        name={spinner.type}
      />
      <IonLabel>{label}</IonLabel>
    </>
  )

  return button
  
  ? button.type === 'submit'

    ? <IonButton style={style} expand='block' color={button.color} type={button.type} onClick={(e)=>{setActive(1000)}}>
        {buttonContent(label, spinner)}
      </IonButton>

    : <IonButton style={style} expand='block' color={button.color} routerDirection={'root'} routerLink={button.routerLink} onClick={(e)=>{setActive(10000)}}>
        {buttonContent(label, spinner)}
      </IonButton>

  : <IonItem lines='none'>
      <IonLabel>
        <h3><IonSkeletonText animated style={{ width: '100%', height: '32px', margin: '12px 0px'}} /></h3>
      </IonLabel>
    </IonItem>

}

export default Button