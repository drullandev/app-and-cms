import React, { useEffect, useState } from 'react';
import './style.css';

interface OverlayProps {
  show: boolean;
}

const Overlay: React.FC<OverlayProps> = ({ show}) => {

  const [dots, setDots] = useState('.');

  useEffect(() => {

    if (!show) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? '.' : prev + '.'));
    }, 500);

    return ()=> clearInterval(interval);

  }, [show]);

  return show ? (
    <div className="overlay">
      <div className="spinner"></div>
      <p className="message">Please wait {dots}</p>
    </div>
  ) : null;
};

export default Overlay;
