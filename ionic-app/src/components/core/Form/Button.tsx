import * as AppConst from '../../../data/static/constants'

import React, { FC ,useState } from 'react'
import { IonLabel, IonButton, IonSpinner, IonItem, IonSkeletonText, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react'
import { FieldProps } from './types'
import Icon from '../main/Icon'
import * as icon from 'ionicons/icons'

const style = { marginTop: '20px' }

/**
 * 
 * @param field This component allows you to create a button with a sort of extras as the spinner
 * @returns 
 */
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

  const buttonContent = (field: FieldProps, spinner: any) => (
    <>
      {!display
      ? <IonSpinner name={spinner.type}/>
      : <IonIcon slot="start" icon={field.icon ? field.icon : icon.star}/>}
        <IonLabel>{field.label}</IonLabel>
    </>
  )

  return <>{
    field
    
    ? field.onClick !== undefined
  
      ? <IonButton
          style={style}
          expand='block'
          color={field.color}
          fill={field.fill ?? 'solid'}
          size={field.size ?? 'default'}
          onClick={(e:any)=>{setActive(1000, field.onClick)}}>
          {buttonContent(field, spinner)}
        </IonButton>
  
      : <IonButton style={style} 
          expand='block' 
          color={field.color}          
          fill={field.fill ?? 'solid'}
          size={field.size ?? 'default'}
            routerDirection={'root'} 
            type={field.fieldType}
          onClick={(e:any)=>{setActive(10000)}}>
          {buttonContent(field, spinner)}
        </IonButton>
  
    : <IonItem lines='none'>
        <IonLabel>
          <h3><IonSkeletonText animated style={{ width: '100%', height: '32px', margin: '12px 0px'}} /></h3>
        </IonLabel>
      </IonItem>
  }</>

}

export default Button