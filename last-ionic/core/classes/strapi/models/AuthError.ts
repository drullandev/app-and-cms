import { User } from "./User";

interface AuthError {
  jwt: string;
  user: User;
}

export type { AuthError };