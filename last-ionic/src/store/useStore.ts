// src/store/useStore.ts
import create from 'zustand';

interface UserState {
  darkMode: boolean;
  isAuthenticated: boolean;
  setDarkMode: (darkMode: boolean) => void;
  // Puedes añadir más estados según sea necesario
}

export const useStore = create<UserState>((set) => ({
  darkMode: false,
  isAuthenticated: false,
  setDarkMode: (darkMode) => set({ darkMode }),
}));
