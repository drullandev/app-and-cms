import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover } from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import './About.scss';
const About = () => {
    const { t } = useTranslation();
    const [showPopover, setShowPopover] = useState(false);
    const [popoverEvent, setPopoverEvent] = useState();
    const [location, setLocation] = useState('madison');
    const [conferenceDate, setConferenceDate] = useState('2047-05-17T00:00:00-05:00');
    const selectOptions = {
        header: 'Select a Location'
    };
    const presentPopover = (e) => {
        //setPopoverEvent(e.nativeEvent)
        setShowPopover(true);
    };
    // momentjs would be a better way to do this https://momentjs.com/
    function displayDate(date, format) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const d = new Date(date);
        const year = d.getFullYear();
        if (format === 'y') {
            return year;
        }
        else {
            const month = monthNames[d.getMonth()];
            const day = d.getDate();
            return month + ' ' + day + ', ' + year;
        }
    }
    return (_jsxs(IonPage, { id: 'about-page', children: [_jsxs(IonContent, { children: [_jsx(IonHeader, { className: 'ion-no-border', children: _jsxs(IonToolbar, { children: [_jsx(IonButtons, { slot: 'start', children: _jsx(IonMenuButton, {}) }), _jsx(IonButtons, { slot: 'end', children: _jsx(IonButton, { onClick: presentPopover, children: _jsx(IonIcon, { slot: 'icon-only', ios: ellipsisHorizontal, md: ellipsisVertical }) }) })] }) }), _jsxs("div", { className: 'about-header', children: [_jsx("div", { className: 'about-image madison', style: { 'opacity': location === 'madison' ? '1' : undefined } }), _jsx("div", { className: 'about-image austin', style: { 'opacity': location === 'austin' ? '1' : undefined } }), _jsx("div", { className: 'about-image chicago', style: { 'opacity': location === 'chicago' ? '1' : undefined } }), _jsx("div", { className: 'about-image seattle', style: { 'opacity': location === 'seattle' ? '1' : undefined } })] }), _jsxs("div", { className: 'about-info', children: [_jsx("h3", { className: 'ion-padding-top ion-padding-start', children: "About" }), _jsxs("p", { className: 'ion-padding-start ion-padding-end', children: ["The Ionic Conference is a one-day conference on ", displayDate(conferenceDate, 'mediumDate'), " featuring talks from the Ionic team. It is focused on Ionic applications being built with Ionic Framework. This includes migrating apps to the latest version of the framework, Angular concepts, Webpack, Sass, and many other technologies used in Ionic 2. Tickets are completely sold out, and we\u2019re expecting more than 1000 developers \u2013 making this the largest Ionic conference ever!"] }), _jsx("h3", { className: 'ion-padding-top ion-padding-start', children: "Details" }), _jsxs(IonList, { lines: 'none', children: [_jsxs(IonItem, { children: [_jsx(IonLabel, { children: "Location" }), _jsxs(IonSelect, { value: location, interfaceOptions: selectOptions, onIonChange: (e) => setLocation(e.detail.value), children: [_jsx(IonSelectOption, { value: 'madison', children: "Madison, WI" }), _jsx(IonSelectOption, { value: 'austin', children: "Austin, TX" }), _jsx(IonSelectOption, { value: 'chicago', children: "Chicago, IL" }), _jsx(IonSelectOption, { value: 'seattle', children: "Seattle, WA" })] })] }), _jsxs(IonItem, { children: [_jsx(IonLabel, { children: "Date" }), _jsx(IonDatetime
                                            //displayFormat='MMM DD, YYYY'
                                            , { 
                                                //displayFormat='MMM DD, YYYY'
                                                max: '2056', value: conferenceDate, onIonChange: (e) => setConferenceDate(e.detail.value) })] })] }), _jsx("h3", { className: 'ion-padding-top ion-padding-start', children: "Internet" }), _jsxs(IonList, { lines: 'none', children: [_jsxs(IonItem, { children: [_jsx(IonLabel, { children: "Wifi network" }), _jsxs(IonLabel, { className: 'ion-text-end', children: ["ica", displayDate(conferenceDate, 'y')] })] }), _jsxs(IonItem, { children: [_jsx(IonLabel, { children: "Password" }), _jsx(IonLabel, { className: 'ion-text-end', children: "makegoodthings" })] })] })] })] }), _jsx(IonPopover, { isOpen: showPopover, event: popoverEvent, onDidDismiss: () => setShowPopover(false) })] }));
};
export default About;
