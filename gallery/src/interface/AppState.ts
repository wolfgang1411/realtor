import { IUser } from "./User";

export interface IAppState {
  isAuthenticated: boolean;
  user?: IUser;
  token?: string;
}
