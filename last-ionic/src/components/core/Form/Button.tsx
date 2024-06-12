import React, { FC ,useState } from 'react';
import { IonLabel, IonButton, IonSpinner, IonItem, IonSkeletonText, IonIcon } from '@ionic/react';
import { FieldProps } from './types';
import Icon from '../main/Icon';
import * as icon from 'ionicons/icons';
import { timeout } from '../../../data/static/constants'; // Importamos solo 'timeout' de AppConst

const style = { marginTop: '20px' };

/**
 * Este componente permite crear un botón con una especie de extras como el spinner.
 * @param field Las props del campo.
 * @returns El botón renderizado.
 */
const Button: FC<FieldProps> = (field) => {

  const spinner = {
    type: 'lines-small',
    position: 'left', // Ahora solo se admite la posición 'left'
  };

  const [display, setDisplay] = useState<boolean>(false); // Estado de visualización del spinner

  const setActive = async (timeOut: number = timeout.refresh, func?: Function) => {
    if(func) func();
    setDisplay(true);
    setInactive(timeOut);
  };

  const setInactive = async (timeOut: number = timeout.buttonSpinner) => {
    setTimeout(() => {
      setDisplay(false);
    }, timeOut);
  };

  const buttonContent = (field: FieldProps, spinner: any) => (
    <>
      { !display ? <IonSpinner name={spinner.type}/> : <IonIcon slot="start" icon={field.icon ? field.icon : icon.star}/> }
      <IonLabel>{field.label}</IonLabel>
    </>
  );

  return (
    <>
      { field ?
        (field.onClick !== undefined ?
          <IonButton
            style={style}
            expand='block'
            color={field.color || 'primary'}
            fill={field.fill ?? 'solid'}
            size={field.size ?? 'default'}
            onClick={(e:any)=>{setActive(1000, field.onClick)}}
          >
            {buttonContent(field, spinner)}
          </IonButton>
          :
          <IonButton
            style={style}
            expand='block'
            color={field.color || 'primary'}
            fill={field.fill ?? 'solid'}
            size={field.size ?? 'default'}
            routerDirection={'root'}
            type={field.fieldType}
            onClick={(e:any)=>{setActive(10000)}}
          >
            {buttonContent(field, spinner)}
          </IonButton>
        )
        :
        <IonItem lines='none'>
          <IonLabel>
            <h3><IonSkeletonText animated style={{ width: '100%', height: '32px', margin: '12px 0px'}} /></h3>
          </IonLabel>
        </IonItem>
      }
    </>
  );
}

export default Button;
