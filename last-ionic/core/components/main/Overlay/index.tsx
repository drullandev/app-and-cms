import React, { useEffect, useState } from 'react';
import './style.css';
import { OverlayProps } from './types';
import useOverlayStore from './store'; // Importa el store de Zustand

const Overlay: React.FC<OverlayProps> = ({ duration = 500 }) => {
  const [dots, setDots] = useState('.');
  const show = useOverlayStore((state) => state.showOverlay);

  useEffect(() => {
    if (!show) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? '.' : prev + '.'));
    }, duration);

    return () => clearInterval(interval);
  }, [show, duration]);

  return show ? (
    <div className="overlay">
      <div className="spinner"></div>
      <p className="message">Please wait {dots}</p>
    </div>
  ) : null;
};

export default React.memo(Overlay);

// Para mostrar y ocultar el overlay, debemos usar estas funciones DENTRO de un componente funcional:
export const useOverlayControl = () => {
  const show = useOverlayStore((state) => state.show);
  const hide = useOverlayStore((state) => state.hide);

  return { showOverlay: show, hideOverlay: hide };
};
