export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  darkMode: boolean;
  hasSeenTutorial: string; // Aunque parece booleano, en tus datos es un string
}

export interface ILogin {
  identifier: string;
  password: string;
}

export interface IForgot {
  email: string;
}

export interface IRegister {
  username: string;
  password: string;
  email: string;
}

export interface IResetPassword {
  password: string;
  repeatPassword: string;
  token: string; // Token que recibes del enlace de recuperación
}
