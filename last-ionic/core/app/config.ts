import { setupIonicReact } from '@ionic/react';

// Third part
// Google Analitics...
import ReactGA from 'react-ga';

// Inicializa Google Analytics
if (process.env.NODE_ENV === 'production'){
    ReactGA.initialize('UA-XXXXXXXXX-X'); // TODO: Mueve el parámetro a un entorno seguroç
}

// Inicialice Ionic React
setupIonicReact({//TODO: Mueve el parámetro a un entorno seguro
    rippleEffect: true,
    animated: true,
});
  