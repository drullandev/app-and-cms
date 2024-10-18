import { create } from 'zustand';

interface ToastState {
  toasts: { header: string; message: string; type: 'success' | 'error'; }[];
  addToast: (header: string, message: string, type: 'success' | 'error') => void;
  clearToasts: () => void;
}

const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (header, message, type) => set((state) => ({
    toasts: [...state.toasts, { header, message, type }]
  })),
  clearToasts: () => set({ toasts: [] }),
}));

export const addToast = (
  header: string,
  message: string,
  type: 'success' | 'error'
) => {
  useToastStore.getState().addToast(header, message, type);
  console.log('Toast añadido:', { header, message, type });
};

export default useToastStore;
