import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IonAlert } from '@ionic/react';
import { useTranslation } from 'react-i18next';
/**
 *  Only an static Alert container. To simulate state change with the 'same error' than prev, I use the timestamp value *
 * @params
 * @returns
 */
const Alert = (settingAlert) => {
    const { t } = useTranslation();
    return _jsx(IonAlert, { ...settingAlert });
};
export default React.memo(Alert);
