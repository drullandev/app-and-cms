import React from 'react';
import { IonList } from '@ionic/react';
import { AccessibleIonList } from '../interfaces/ionicAccesibility';

/**
 * Component List
 * A custom wrapper around IonList that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonList} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonList
 */
const List: React.FC<AccessibleIonList> = (props: AccessibleIonList) => {
    const { ariaLabel, role = 'list', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonList
    return <IonList aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(List);