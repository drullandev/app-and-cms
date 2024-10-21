// Exportar y renombrar tipos desde AuthError
export type { AuthError as AuthErrorStrapi } from './AuthError';

// Exportar y renombrar tipos desde AuthResponse
export type { AuthResponse as AuthResponseStrapi } from './AuthResponse';

// Exportar cada tipo por separado desde User y renombrarlos para evitar ambigüedad
export type { User as UserStrapi } from './User';
export type { ILogin as UserLoginStrapi } from './User';
export type { IForgot as UserRecoverStrapi } from './User';
export type { IRegister as UserRegisterStrapi } from './User';
