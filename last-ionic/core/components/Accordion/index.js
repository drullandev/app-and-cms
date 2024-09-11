import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { IonItem, IonItemGroup, IonLabel, IonButton, IonIcon, IonAccordion, IonContent } from '@ionic/react';
import * as icon from 'ionicons/icons'; // Import necessary icons
import './style.css'; // Import styles for the accordion
const Accordion = ({ title, data, sections }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    return (_jsxs(IonItemGroup, { children: [_jsxs(IonItem, { button: true, onClick: toggleAccordion, children: [_jsx(IonLabel, { children: _jsx("b", { children: title }) }), _jsx(IonButton, { fill: "clear", slot: "end", children: _jsx(IonIcon, { icon: isOpen ? icon.chevronUpOutline : icon.chevronDownOutline }) })] }), data && _jsx("pre", { children: JSON.stringify(data) }), sections && sections.map((section, index) => (_jsxs(IonAccordion, { value: `section-${index}`, children: [_jsx(IonItem, { slot: "header", children: _jsx(IonLabel, { children: _jsx("b", { children: section.title }) }) }), isOpen && _jsx(IonContent, { slot: "content", children: JSON.stringify(section.content) })] }, index)))] }));
};
export default Accordion;
