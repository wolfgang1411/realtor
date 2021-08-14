import { createState } from "@hookstate/core";
import { IAppState } from "../interface/AppState";

const data: IAppState = {
  isAuthenticated: false,
  user: undefined,
  token: localStorage.getItem("token") || undefined,
};

export const AppState = createState(data);
