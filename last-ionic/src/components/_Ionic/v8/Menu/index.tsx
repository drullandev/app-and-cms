import React from 'react';
import { IonMenu } from '@ionic/react';
import { AccessibleIonMenu } from '../interfaces/ionicAccesibility';

/**
 * Component Menu
 * A custom wrapper around IonMenu that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonMenu} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonMenu
 */
const Menu: React.FC<AccessibleIonMenu> = (props: AccessibleIonMenu) => {
    const { ariaLabel = 'Menu', role = 'navigation', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonMenu
    return <IonMenu aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(Menu);