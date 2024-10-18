import { create } from 'zustand';
import { ModalOptions } from '@ionic/core';

interface ModalState {
  defaultOptions: Partial<ModalOptions>;
  modals: ModalOptions[];
  addModal: (options: Partial<ModalOptions>) => void;
  clearModals: () => void;
  setDefaultOptions: (options: Partial<ModalOptions>) => void;
}

const useModalStore = create<ModalState>((set) => ({
  defaultOptions: {
    backdropDismiss: true,
    animated: true,
    cssClass: 'custom-modal-class',
    mode: 'ios',
  },
  modals: [],
  addModal: (options) =>
    set((state) => ({
      modals: [...state.modals, { ...state.defaultOptions, ...options }] as ModalOptions[], // Asegúrate de que el tipo sea correcto
    })),
  clearModals: () =>
    set(() => ({
      modals: [],
    })),
  setDefaultOptions: (options) =>
    set((state) => ({
      defaultOptions: { ...state.defaultOptions, ...options },
    })),
}));

export const addModal = (options: Partial<ModalOptions>) => {
  useModalStore.getState().addModal(options);
  console.log('Modal añadido:', options);
};

export const setModalDefaultOptions = (options: Partial<ModalOptions>) => {
  useModalStore.getState().setDefaultOptions(options);
  console.log('Opciones predeterminadas de modal establecidas:', options);
};

export default useModalStore;
