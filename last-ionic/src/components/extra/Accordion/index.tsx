import React, { useState } from 'react';
import { IonItem, IonItemGroup, IonLabel, IonButton, IonIcon, IonAccordion, IonContent } from '@ionic/react';
import * as icon from 'ionicons/icons';
import Looper from '../../utils/Looper';

import './style.css'; 

interface AccordionSection {
  title: string;
  content: any;
}

interface AccordionProps {
  title: string;
	data?: any;
  sections: AccordionSection[]; // Array of sections to display in the accordion
}

const Accordion: React.FC<AccordionProps> = ({ title, data, sections }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const AccordionSection = (section: AccordionSection, index: number) => (
    <IonAccordion key={index} value={`section-${index}`}>
      <IonItem slot="header">
        <IonLabel><b>{section.title}</b></IonLabel>
      </IonItem>
      {isOpen && <IonContent slot="content">
        {JSON.stringify(section.content)}
      </IonContent>}
    </IonAccordion>
  )

  return (
    <IonItemGroup>
      <IonItem button onClick={toggleAccordion}>
        <IonLabel><b>{title}</b></IonLabel>
        <IonButton fill="clear" slot="end">
          <IonIcon icon={isOpen ? icon.chevronUpOutline : icon.chevronDownOutline} />
        </IonButton>
      </IonItem>
			{data && <pre>{JSON.stringify(data)}</pre>}
      <Looper items={sections} renderItem={AccordionSection}/>
    </IonItemGroup>
  );
};

export default Accordion;
