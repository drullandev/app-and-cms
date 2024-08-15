import React, { useState } from 'react';
import { IonItem, IonItemGroup, IonLabel, IonButton, IonIcon, IonAccordion, IonContent } from '@ionic/react';
import * as icon from 'ionicons/icons'; // Import necessary icons
import './style.css'; // Import styles for the accordion

interface AccordionSection {
  title: string;
  content: any;
}

interface AccordionProps {
  title: string;
	data: any;
  sections: AccordionSection[]; // Array of sections to display in the accordion
}

const Accordion: React.FC<AccordionProps> = ({ title, data, sections }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <IonItemGroup>
      <IonItem button onClick={toggleAccordion}>
        <IonLabel><b>{title}</b></IonLabel>
        <IonButton fill="clear" slot="end">
          <IonIcon icon={isOpen ? icon.chevronUpOutline : icon.chevronDownOutline} />
        </IonButton>
      </IonItem>
			{data && <pre>{JSON.stringify(data)}</pre>}
      {sections && sections.map((section, index) => (
        <IonAccordion key={index} value={`section-${index}`}>
          <IonItem slot="header">
            <IonLabel><b>{section.title}</b></IonLabel>
          </IonItem>
          {isOpen && <IonContent slot="content">
            {JSON.stringify(section.content)}
          </IonContent>}
        </IonAccordion>
      ))}
    </IonItemGroup>
  );
};

export default Accordion;
