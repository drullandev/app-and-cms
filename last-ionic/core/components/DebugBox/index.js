import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { IonAccordionGroup, IonItem } from '@ionic/react';
import DebugUtils from '../../classes/utils/DebugUtils';
const DebugBox = ({ debugThis, children }) => {
    const debug = DebugUtils.setDebug(false);
    const [isOpen, setIsOpen] = useState(false);
    // Check if we are in a development environment and if debug is enabled
    if (process.env.NODE_ENV !== 'development' || !debugThis) {
        //if (debug) LoggerUtils.log('DebugBox is not visible due to environment or debug flag.');
        return null;
    }
    // Toggle the state of the DebugBox
    const toggleDebugBox = () => {
        setIsOpen(!isOpen);
        //LoggerUtils.log('DebugBox toggled:', isOpen ? 'closed' : 'open');
    };
    const accordionGroup = useRef(null);
    const toggleAccordion = () => {
        if (!accordionGroup.current) {
            return;
        }
        const nativeEl = accordionGroup.current;
        if (nativeEl.value === 'second') {
            nativeEl.value = undefined;
        }
        else {
            nativeEl.value = 'second';
        }
    };
    return (_jsx(_Fragment, { children: _jsx(IonAccordionGroup, { ref: accordionGroup, children: children.map((child, index) => (_jsx(IonItem, {}, 'accor-' + index))) }) }));
};
export default DebugBox;
