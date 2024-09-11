import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect, useState } from 'react';
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonSkeletonText, IonThumbnail } from '@ionic/react';
import Icon from './Icon';
import useSearchStore from '../../classes/stores/searcher.store'; // Import the new search store
const SessionListItem = ({ row }) => {
    const [line, setLine] = useState(undefined);
    const ionItemSlidingRef = useRef(null);
    const { searchString } = useSearchStore();
    // Simula una llamada para obtener datos. Reemplaza esto con tu lógica real.
    useEffect(() => {
        /*restGet('user-contents', { id: row.id })
        .then(res => {
          if (res.status === 200) {
            setLine(res.data[0]);
          }
        }).catch(err => {
          console.log(err);
        });
        */
    }, [row?.id, searchString]);
    const dismissAlert = () => {
        ionItemSlidingRef.current && ionItemSlidingRef.current.close();
    };
    const removeLine = () => {
        console.log('You pretend to remove this from the list or including from the database ^^');
    };
    const putTimeline = (line) => {
        return _jsxs("p", { children: [line.created_at, "\u2014\u00A0", line.published_at, "\u2014\u00A0", line.published_at] });
    };
    const putContent = (line) => {
        return _jsx("h3", { children: line.id + ' - ' + line.content });
    };
    return line ? (_jsxs(IonItemSliding, { ref: ionItemSlidingRef, className: 'track-' + row.id, children: [_jsx(IonItem, { routerLink: `/tabs/list/asdfasdfas/${line.id}`, children: _jsxs(IonLabel, { children: [putContent(line), putTimeline(line)] }) }), _jsxs(IonItemOptions, { children: [_jsx(IonItemOption, { color: "danger", onClick: () => removeLine(), children: _jsx(Icon, { slot: '', name: 'trashoutline' }) }), _jsx(IonItemOption, { color: "favorite", onClick: () => console.log('Favorite clicked'), children: _jsx(Icon, { slot: '', name: 'staroutline' }) })] })] })) : (_jsxs(IonItem, { children: [_jsx(IonThumbnail, { slot: "start", children: _jsx(IonSkeletonText, { animated: true }) }), _jsxs(IonLabel, { children: [_jsx("h3", { children: _jsx(IonSkeletonText, { animated: true, style: { width: '50%' } }) }), _jsx("p", { children: _jsx(IonSkeletonText, { animated: true, style: { width: '80%' } }) }), _jsx("p", { children: _jsx(IonSkeletonText, { animated: true, style: { width: '60%' } }) })] })] }));
};
export default SessionListItem;
