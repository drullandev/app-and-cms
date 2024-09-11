import { jsx as _jsx } from "react/jsx-runtime";
import { IonIcon } from '@ionic/react';
import { logIn, logOut, person, personAdd, calendarOutline, peopleOutline, mapOutline, informationCircleOutline, location, calendar, informationCircle, people, help, home, homeOutline, bug, mailUnread, search, options, starOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
// All the avilable ionicos on the app
addIcons({
    'login': logIn,
    'logout': logOut,
    'person': person,
    'personadd': personAdd,
    'calendaroutline': calendarOutline,
    'peopleoutline': peopleOutline,
    'mapoutline': mapOutline,
    'location': location,
    'calendar': calendar,
    'people': people,
    'help': help,
    'home': home,
    'homeoutline': homeOutline,
    'bug': bug,
    'informationcircleoutline': informationCircleOutline,
    'informationcircle': informationCircle,
    'mailunread': mailUnread,
    'search': search,
    'options': options,
    'staroutline': starOutline,
    'trashoutline': trashOutline
});
const Icon = ({ slot, name }) => (slot ? _jsx(IonIcon, { slot: slot, name: name.toLowerCase() }) : _jsx(IonIcon, { name: name.toLowerCase() }));
export default Icon;
