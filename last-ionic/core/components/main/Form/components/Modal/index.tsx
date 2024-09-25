import { IonModal, IonButton, IonContent, IonSpinner } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';//TODO: Change by utils

const Modal: React.FC<any> = ({ open, showButton, model, slug, contentIn }) => {
    
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (showModal && slug) {
      setLoading(true);
      axios.get(slug)
        .then(response => {
          setContent(response.data);
        })
        .catch(error => {
          console.error("Error loading content: ", error);
          setContent("Error loading content");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      if (contentIn) {
        setContent(contentIn)
      }
    }
  }, [showModal, slug]);

  return (
    <>
      {showButton && <IonButton onClick={() => setShowModal(true)}>Show Modal</IonButton>}
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonContent>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <IonSpinner />
            </div>
          ) : (
            <div>
              <h1>This is a modal</h1>
              {content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : <p>No content available</p>}
              <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
            </div>
          )}
        </IonContent>
      </IonModal>
    </>
  );
};

export default React.memo(Modal);
