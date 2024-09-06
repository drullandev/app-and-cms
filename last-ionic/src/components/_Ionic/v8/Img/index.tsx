import React from 'react';
import { IonImg } from '@ionic/react';
import { AccessibleIonImg } from '../interfaces/ionicAccesibility';

/**
 * Component Img
 * A custom wrapper around IonImg that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonImg} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonImg
 */
const Img: React.FC<AccessibleIonImg> = (props: AccessibleIonImg) => {
    const { alt, role = 'img', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonImg
    return <IonImg alt={alt} role={role} {...restProps} />;
};

export default React.memo(Img);