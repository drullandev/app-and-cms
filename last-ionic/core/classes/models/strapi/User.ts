export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string; // Fecha en formato ISO
  updatedAt: string; // Fecha en formato ISO
  darkMode: boolean;
  hasSeenTutorial: string; // Aunque parece booleano, en tus datos es un string
}

export interface ILogin {
  identifier: string;
  password: string;
}