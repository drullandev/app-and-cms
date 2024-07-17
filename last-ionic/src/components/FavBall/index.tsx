import React, { useMemo } from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { FavProps } from './types';

/**
 * FavBall component
 * This component renders a floating action button (FAB) with an icon.
 * It can optionally trigger a function when clicked.
 * 
 * @param {FavProps} props - The props for the FavBall component.
 * @param {boolean} props.show - Determines whether the FAB should be shown.
 * @param {object} props.style - Style properties for the FAB and icon.
 * @param {string} props.style.vertical - Vertical position of the FAB.
 * @param {string} props.style.color - Color of the FAB.
 * @param {string} props.style.class - CSS class for the icon.
 * @param {string} props.style.icon - Icon to be displayed inside the FAB.
 * @param {function} props.jumpToStart - Function to be called when the FAB is clicked.
 * 
 * @returns {JSX.Element} The rendered component.
 */
const FavBall: React.FC<FavProps> = ({ show = true, style = {}, onClick = ()=>{} }: FavProps): JSX.Element => {
  // Destructure style properties with default values
  const { vertical = 'bottom', color = 'primary', class: iconClass = '', icon } = style;

  // Memoize the style for the FAB based on the show prop
  const fabStyles = useMemo(() => ({ display: show ? 'inline' : 'none' }), [show]);

  // Handle the click event
  const handleClick = (e: any) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <IonFab style={fabStyles} vertical={vertical} horizontal="end" slot="fixed">
      <IonFabButton className="mapboxgl-ctrl-geolocate fade-in-5" color={color} onClick={handleClick}>
        <IonIcon key="icon" className={iconClass} icon={icon} />
      </IonFabButton>
    </IonFab>
  );
};

export default React.memo(FavBall);
