import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Si usas react-router

const useWebSocket = () => {
  const location = useLocation();

  useEffect(() => {
    // No inicializar WebSockets si estamos en la página de login
    if (location.pathname === '/login') {
      return;
    }

    // Inicializa el WebSocket solo en otras páginas
    const socket = new WebSocket('wss://example.com/socket');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
    };

    // Cleanup cuando el componente se desmonta
    return () => {
      socket.close();
    };
  }, [location.pathname]);

  return null;
};

export default useWebSocket;
