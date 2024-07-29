import React, { useState } from 'react';
import { IonItem, IonInput, IonButton, IonContent, IonPage, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { send } from 'ionicons/icons';
import './style.css';

interface Message {
  user: string;
  text: string;
  time: string
}

/**
 * 
 * @returns For now ia only to speak with support in a beauty way .9
 */
const Chat: React.FC = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const sendMessage = (input: string) => {
    console.log(input);
  }

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      user: 'You',
      text: input,
      time: '',
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);

    // Simular respuesta automática
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { user: 'Bot', text: 'This is an automated response.' }]);
    }, 1000);

    setInput('');
  };

  return (
    <>
      <IonContent className="chat-container">
        <div className="chat-content">
          {messages.map((message, index) => (
            <IonCard key={index} className={`chat-message ${message.user === 'You' ? 'user-message' : 'bot-message'}`}>
              <IonCardContent>
                <strong>{message.user}:</strong> {message.text}
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </IonContent>
      <div className="chat-input">
        <IonItem>
          <IonInput
            value={input}
            placeholder="Type a message"
            onIonChange={e => setInput(e.detail.value!)}
            onKeyPress={e => e.key === 'Enter' ? handleSendMessage() : null}
          />
        </IonItem>
        <IonButton onClick={handleSendMessage} color="primary">
          <IonIcon slot="icon-only" icon={send}></IonIcon>
        </IonButton>
      </div>
    </>
  );
};

export default Chat;
