import React from 'react';
import { IonPopover } from '@ionic/react';
import { AccessibleIonPopover } from '../interfaces/ionicAccesibility';

/**
 * Component Popover
 * A custom wrapper around IonPopover that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonPopover} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonPopover
 */
const Popover: React.FC<AccessibleIonPopover> = (props: AccessibleIonPopover) => {
    const { ariaLabel, role = 'dialog', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonPopover
    return <IonPopover aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(Popover);