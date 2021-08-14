import jwt_decode from "jwt-decode";
import axios from "axios";
import { Server } from "./server";

export const Auth = () => {
  if (localStorage.getItem("token")) {
    Server.get(`http://localhost:5000/api/auth`).then((response) => {
      console.log(response);
    });
  }
};
