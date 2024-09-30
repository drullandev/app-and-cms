import { User } from "./User";

export interface AuthResponse {
  jwt: string;
  user: User;
}