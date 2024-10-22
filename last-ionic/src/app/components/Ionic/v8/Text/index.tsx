import React from 'react';
import { IonNote } from '@ionic/react';
import { AccessibleIonNote } from '../interfaces/accesibility';

/**
 * Component Note
 * A custom wrapper around IonNote that enforces accessibility attributes.
 * 
 * This component ensures that accessibility attributes are properly passed
 * to IonNote, making the note content more inclusive for users with disabilities.
 * 
 * @author David Rullán Díaz
 * @href http://github.com/drullandev
 * @date
 *
 * @param {AccessibleIonNote} props Props of the component, enforcing accessibility attributes
 * @returns React component wrapping IonNote
 */
const Note: React.FC<AccessibleIonNote> = (props: AccessibleIonNote) => {
    const { ariaLabel, role = 'note', ...restProps } = props;

    // Ensure accessibility attributes are passed down to IonNote
    return <IonNote style={{fontSize: '16px'}} aria-label={ariaLabel} role={role} {...restProps} />;
};

export default React.memo(Note);
