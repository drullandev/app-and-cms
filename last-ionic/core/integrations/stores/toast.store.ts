import { create } from 'zustand';

// Definimos la interfaz del estado del ToastStore
interface ToastState {
  toasts: { header: string; message: string; type: 'success' | 'error'; }[];
  addToast: (header: string, message: string, type: 'success' | 'error') => void;
  clearToasts: () => void;
}

// Crear el store usando Zustand
const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (header, message, type) => set((state) => ({
    toasts: [...state.toasts, { header, message, type }]
  })),
  clearToasts: () => set({ toasts: [] }), // Limpiar todos los toasts
}));

// Exportar la función sin necesidad de usar el hook directamente
export const addToast = (header: string, message: string, type: 'success' | 'error') => {
  useToastStore.getState().addToast(header, message, type);
  console.log('Toast añadido:', { header, message, type });
};

export default useToastStore;
