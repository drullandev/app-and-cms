import { create } from 'zustand';
import { ToastOptions } from '@ionic/core';

interface ToastState {
  defaultOptions: Partial<ToastOptions>;
  toasts: ToastOptions[];
  addToast: (options: Partial<ToastOptions>) => void;
  clearToasts: () => void;
  setDefaultOptions: (options: Partial<ToastOptions>) => void;
}

const useToastStore = create<ToastState>((set) => ({
  defaultOptions: {
    position: 'bottom',
    duration: 3000,
    animated: true,
    color: 'success',
  },
  toasts: [],
  addToast: (options) => set((state) => ({
    toasts: [...state.toasts, { ...state.defaultOptions, ...options }]
  })),
  clearToasts: () => set({ toasts: [] }),
  setDefaultOptions: (options) => set((state) => ({
    defaultOptions: { ...state.defaultOptions, ...options }
  })),
}));


export const addToast = (options: Partial<ToastOptions>) => {
  useToastStore.getState().addToast(options);
  console.log('Toast añadido:', options);
};

export const setToastDefaultOptions = (options: Partial<ToastOptions>) => {
  useToastStore.getState().setDefaultOptions(options);
  console.log('Opciones predeterminadas de toast establecidas:', options);
};

export default useToastStore;
