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

export interface IRecover {
  email: string;
}

export interface IRegister {
  name: string;
  password: string;
  email: string;
  username: string;
}
