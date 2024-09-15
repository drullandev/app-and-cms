import React, { useRef, useState } from 'react';

import { default as LoggerUtils } from '../../../classes/utils/LoggerUtils';
import { IonAccordionGroup, IonItem } from '@ionic/react';
import DebugUtils from '../../../classes/utils/DebugUtils';

interface DebugBoxProps {
  debugThis: boolean; // Flag to enable the DebugBox
  children: any[]; // Content to display inside the DebugBox
}

const DebugBox: React.FC<DebugBoxProps> = ({ debugThis, children }) => {
  const debug = DebugUtils.setDebug(false);
  const [isOpen, setIsOpen] = useState(false);

  // Check if we are in a development environment and if debug is enabled
  if (process.env.NODE_ENV !== 'development' || ! debugThis) {
    //if (debug) LoggerUtils.log('DebugBox is not visible due to environment or debug flag.');
    return null;
  }

  // Toggle the state of the DebugBox
  const toggleDebugBox = () => {
    setIsOpen(!isOpen);
    //LoggerUtils.log('DebugBox toggled:', isOpen ? 'closed' : 'open');
  };

	const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);
  const toggleAccordion = () => {
    if (!accordionGroup.current) {
      return;
    }
    const nativeEl = accordionGroup.current;

    if (nativeEl.value === 'second') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'second';
    }
  };

  return (
    <>
			<IonAccordionGroup ref={accordionGroup}>
				{children.map((child, index) => (
          <IonItem key={'accor-'+index}></IonItem>
				))}
			</IonAccordionGroup>
    </>
  );
};

export default DebugBox;
