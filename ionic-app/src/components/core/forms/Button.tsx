import * as AppConst from '../../../data/static/constants'

import React, { FC ,useState } from 'react'
import { IonLabel, IonButton, IonSpinner, IonItem, IonSkeletonText } from '@ionic/react'
//import { ButtonProps } from './interfaces/ButtonProps'
import { FieldProps } from './interfaces/FormProps2'

const style = { marginTop: '20px' }

const Button: FC<FieldProps> = (field) => {

  const spinner = {
    type: 'lines-small',
    position: 'left', //Now only left ^^
    display: { true: 'inline', false: 'none' }
  }

  const [display, setDisplay] = useState<any>(spinner.display.false)

  const setActive = async (timeout: number = AppConst.timeout.refresh, func?: Function) => {
    if(func) func()
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
      <IonLabel>{field.label}</IonLabel>
    </>
  )

  return <>{
    field
  
    ? field.fieldType === 'submit'
  
      ? <IonButton
          style={style}
          expand='block'
          color={field.color}
          type={field.type} 
          onClick={(e)=>{setActive(1000, field.onSubmit)}}>
          {buttonContent(field.label, spinner)}
        </IonButton>
  
      : <IonButton style={style} expand='block' 
          color={field.color} 
          routerDirection={'root'} 
          routerLink={field.routerLink} 
          onClick={(e)=>{setActive(10000)}}>
          {buttonContent(field.label, spinner)}
        </IonButton>
  
    : <IonItem lines='none'>
        <IonLabel>
          <h3><IonSkeletonText animated style={{ width: '100%', height: '32px', margin: '12px 0px'}} /></h3>
        </IonLabel>
      </IonItem>
  }</>

}

export default Button