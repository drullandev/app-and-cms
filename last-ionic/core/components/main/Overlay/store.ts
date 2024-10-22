import { create } from 'zustand';

interface OverlayState {
  showOverlay: boolean;
  show: () => void;
  hide: () => void;
}

const useOverlayStore = create<OverlayState>((set) => ({
  showOverlay: false, // Estado inicial del overlay
  show: () => set({ showOverlay: true }), // Función para mostrar el overlay
  hide: () => set({ showOverlay: false }), // Función para ocultar el overlay
}));

export default useOverlayStore;
