import React, { useEffect, useState } from 'react';
import './style.css';
import { OverlayProps } from './types'

const Overlay: React.FC<OverlayProps> = ({ show, duration = 500}) => {

  const [dots, setDots] = useState('.');

  useEffect(() => {

    if (!show) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? '.' : prev + '.'));
    }, duration);

    return ()=> clearInterval(interval);

  }, [show]);

  return show ? (
    <div className="overlay">
      <div className="spinner"></div>
      <p className="message">Please wait {dots}</p>
    </div>
  ) : null;
};

export default React.memo(Overlay);
