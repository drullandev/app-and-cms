import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonContent } from '@ionic/react';
const FeedBack = ({ id, close }) => {
    return _jsx(IonContent, { className: 'no-scroll', id: 'content' });
};
export default React.memo(FeedBack);
