import create from 'zustand';

// Definir el store
interface AuthState {
  user: { name: string } | null;
  login: (name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (name: string) => set({ user: { name } }),
  logout: () => set({ user: null }),
}));

// Uso en un componente
const Profile = () => {
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  return (
    <div>
      <p>Bienvenido, {user?.name}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};
