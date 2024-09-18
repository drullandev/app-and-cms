import React from 'react';
import { IonSearchbar } from '@ionic/react';
import { AccessibleIonSearchbar } from '../interfaces/accesibility';

/**
 * Component Searchbar
 * A custom wrapper around IonSearchbar that enforces accessibility attributes.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date 
 *
 * @param {AccessibleIonSearchbar} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonSearchbar
 */
const Searchbar: React.FC<AccessibleIonSearchbar> = (props: AccessibleIonSearchbar) => {
    const { ariaLabel, role = 'search', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonSearchbar
    return (
        <IonSearchbar
            aria-label={ariaLabel}
            role={role}
            {...restProps}
        />
    );
};

export default React.memo(Searchbar);