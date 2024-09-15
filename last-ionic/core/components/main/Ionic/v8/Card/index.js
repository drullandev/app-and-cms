import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonCard } from '@ionic/react';
/**
 * Component Card
 * A custom wrapper around IonCard that enforces accessibility attributes.
 *
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonCard} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonCard
 */
const Card = (props) => {
    const { ariaLabel, role = 'article', ...restProps } = props;
    // Force the accessibility attributes to be passed down to IonCard
    return _jsx(IonCard, { "aria-label": ariaLabel, role: role, ...restProps });
};
export default React.memo(Card);
