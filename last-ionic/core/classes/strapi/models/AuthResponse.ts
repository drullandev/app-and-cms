import { User } from "./User";

interface AuthResponse {
  jwt: string | undefined;
  data: {
    jwt: string;
    user: User;
  }
}

export type { AuthResponse };