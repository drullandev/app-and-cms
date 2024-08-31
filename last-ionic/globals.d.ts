// Extiende la interfaz Window para incluir la propiedad gtag
interface Window {
  gtag: (command: string, eventName: string, params: { [key: string]: any }) => void;
}