import React, { useState, useEffect, useRef } from 'react';
import { IonItem, IonInput, IonButton, IonContent, IonPage, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { send } from 'ionicons/icons';
import './style.css';
import Looper from '../../utils/Looper';

interface Message {
  user: string;
  text: string;
  time: string;
}

/**
 * A simple chat interface with a bot response
 */
const Chat: React.FC = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = (input: string) => {
    console.log(input);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      user: 'You',
      text: input,
      time: new Date().toLocaleTimeString(),
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);

    // Simulate automatic response
    setTimeout(() => {
      setMessages((prevMessages: any) => [...prevMessages, { user: 'Bot', text: 'This is an automated response.', time: new Date().toLocaleTimeString() }]);
    }, 1000);

    setInput('');
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <IonContent className="chat-container">
        <div className="chat-content" aria-live="polite" aria-label="Chat messages">
          <Looper items={messages} renderItem={(message: any, index: number) => (
            <IonCard key={index} className={`chat-message ${message.user === 'You' ? 'user-message' : 'bot-message'}`} role="article">
              <IonCardContent>
                <strong>{message.user}:</strong> {message.text}
                <p className="chat-time" aria-label={`Message sent at ${message.time}`}>
                  {message.time}
                </p>
              </IonCardContent>
            </IonCard>
          )} />
          <div ref={chatEndRef} />
        </div>
      </IonContent>
      <div className="chat-input">
        <IonItem>
          <IonInput
            value={input}
            aria-label="Type a message"
            placeholder="Type a message"
            onIonChange={(e: any) => setInput(e.detail.value!)}
            onKeyDown={e => e.key === 'Enter' ? handleSendMessage() : null}
          />
        </IonItem>
        <IonButton onClick={handleSendMessage} color="primary" aria-label="Send message">
          <IonIcon slot="icon-only" icon={send}></IonIcon>
        </IonButton>
      </div>
    </>
  );
};

export default React.memo(Chat);
