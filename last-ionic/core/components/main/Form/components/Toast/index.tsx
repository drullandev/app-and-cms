import React from 'react';
import { IonToast } from '@ionic/react';

const Toast: React.FC<{ message: string }> = ({ message }) => {
  const [showToast, setShowToast] = React.useState(true);

  return (
    <IonToast
      isOpen={showToast}
      message={message}
      duration={2000}
      onDidDismiss={() => setShowToast(false)}
    />
  );
};

export default React.memo(Toast);
