import { IUserRepDto, User } from "../../models/User";

export type signupDto = { firstname: string, lastname: string, email: string, password: string, role: string };
export type loginDto = { email: string, password: string };

export interface IAuthService {
  signup: (opts: signupDto) => Promise<User>;
  login: (opts: loginDto) => Promise<{ accessToken: string, refreshToken: string }>
  confirmEmail: (opts: { id: number, token: string }) => Promise<User>;
  renewAccessToken: (refreshToken: string) => Promise<string>;
  banUser: (id: number) => Promise<User>;
}