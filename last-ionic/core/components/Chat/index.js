import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { IonItem, IonInput, IonButton, IonContent, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { send } from 'ionicons/icons';
import './style.css';
/**
 *
 * @returns For now ia only to speak with support in a beauty way .9
 */
const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const sendMessage = (input) => {
        console.log(input);
    };
    const handleSendMessage = () => {
        if (input.trim() === '')
            return;
        const newMessage = {
            user: 'You',
            text: input,
            time: '',
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        // Simular respuesta automática
        setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, { user: 'Bot', text: 'This is an automated response.' }]);
        }, 1000);
        setInput('');
    };
    return (_jsxs(_Fragment, { children: [_jsx(IonContent, { className: "chat-container", children: _jsx("div", { className: "chat-content", children: messages.map((message, index) => (_jsx(IonCard, { className: `chat-message ${message.user === 'You' ? 'user-message' : 'bot-message'}`, children: _jsxs(IonCardContent, { children: [_jsxs("strong", { children: [message.user, ":"] }), " ", message.text] }) }, index))) }) }), _jsxs("div", { className: "chat-input", children: [_jsx(IonItem, { children: _jsx(IonInput, { value: input, placeholder: "Type a message", onIonChange: (e) => setInput(e.detail.value), onKeyDown: e => e.key === 'Enter' ? handleSendMessage() : null }) }), _jsx(IonButton, { onClick: handleSendMessage, color: "primary", children: _jsx(IonIcon, { slot: "icon-only", icon: send }) })] })] }));
};
export default Chat;
