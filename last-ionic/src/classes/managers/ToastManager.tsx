import { IonToast, IonicSafeString } from '@ionic/react';
import useToastStore from '../../integrations/stores/toast.store';
import { useEffect, useState } from 'react';

const ToastManager: React.FC = () => {
  const { toasts, clearToasts } = useToastStore();
  const [visible, setVisible] = useState(false);
  const [currentToast, setCurrentToast] = useState<{ header: string, message: string, type: string } | null>(null);

  useEffect(() => {
    if (toasts.length > 0) {
      const [nextToast] = toasts;

      // Asegúrate de que `nextToast` contiene `type` y otros valores
      setCurrentToast({
        header: nextToast.header ?? '', // Valor predeterminado para header
        message: (nextToast.message as IonicSafeString).toString() ?? '',
        type: (nextToast as any).color ?? 'success', // Define un valor predeterminado para type
      });
      
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [toasts]);

  const handleDismiss = () => {
    setVisible(false);
    clearToasts();
  };

  return (
    <>
      {currentToast && (
        <IonToast
          isOpen={visible}
          onDidDismiss={handleDismiss}
          message={currentToast.message}
          header={currentToast.header}
          color={currentToast.type === 'success' ? 'success' : 'danger'}
          duration={2000}
        />
      )}
    </>
  );
};

export default ToastManager;
