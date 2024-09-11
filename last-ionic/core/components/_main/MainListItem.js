import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef } from 'react';
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption } from '@ionic/react';
const SessionListItem = ({ isFavorite, onAddFavorite, onRemoveFavorite, onShowAlert, session, listType }) => {
    const ionItemSlidingRef = useRef(null);
    const dismissAlert = () => {
        ionItemSlidingRef.current && ionItemSlidingRef.current.close();
    };
    const removeFavoriteSession = () => {
        onAddFavorite(session.id);
        onShowAlert('Favorite already added', [
            {
                text: 'Cancel',
                handler: dismissAlert
            },
            {
                text: 'Remove',
                handler: () => {
                    onRemoveFavorite(session.id);
                    dismissAlert();
                }
            }
        ]);
    };
    const addFavoriteSession = () => {
        if (isFavorite) {
            // woops, they already favorited it! What shall we do!?
            // prompt them to remove it
            removeFavoriteSession();
        }
        else {
            // remember this session as a user favorite
            onAddFavorite(session.id);
            onShowAlert('Favorite Added', [
                {
                    text: 'OK',
                    handler: dismissAlert
                }
            ]);
        }
    };
    return (_jsxs(IonItemSliding, { ref: ionItemSlidingRef, className: 'track-' + session.tracks[0].toLowerCase(), children: [_jsx(IonItem, { routerLink: `/tabs/home/${session.id}`, children: _jsxs(IonLabel, { children: [_jsx("h3", { children: session.name }), _jsxs("p", { children: [session.timeStart, "\u2014\u00A0", session.timeStart, "\u2014\u00A0", session.location] })] }) }), _jsx(IonItemOptions, { children: listType === "favorites" ?
                    _jsx(IonItemOption, { color: "danger", onClick: () => removeFavoriteSession(), children: "Remove" })
                    :
                        _jsx(IonItemOption, { color: "favorite", onClick: addFavoriteSession, children: "Favorite" }) })] }));
};
export default React.memo(SessionListItem);
