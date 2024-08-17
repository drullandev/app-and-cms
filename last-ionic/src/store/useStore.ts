import create from 'zustand';

// Definir la interfaz del estado
interface AppState {
  darkMode: boolean;
  toogleDarkMode: () => void;
}

// Crear el store usando Zustand
const useStore = create<AppState>((set) => ({
  darkMode: false,
  toogleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export default useStore;
