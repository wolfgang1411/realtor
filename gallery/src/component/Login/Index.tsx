import axios from "axios";
import { useState as useHookState } from "@hookstate/core";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

import LoginInStyle from "./Login.module.scss";
import { AppState } from "../../state/AppState";

interface IndexProps {
  formType: "Login" | "Signup" | "AddProperty";
  onClose: () => void;
}

interface SignUpinputs {
  username?: string;
  email?: string;
  password?: string;
  confirmpassword?: string;
  number?: number;
}

interface Logininputs {
  email: string;
  password: string;
}

const Index = ({ formType, onClose }: IndexProps) => {
  const appState = useHookState(AppState);

  const onSignup: SubmitHandler<SignUpinputs> = (data) => {
    if (data.password !== data.confirmpassword)
      return Swal.fire({ titleText: "password doesnot match" });
    const formdata = {
      username: data.username,
      password: data.password,
      email: data.email,
      number: data.number,
    };
    axios
      .post(`http://localhost:5000/api/user`, { ...formdata })
      .then((response) => {
        appState.isAuthenticated.set(true);
        appState.user.set({ ...response.data.user });
        appState.token.set(response.data.token);
      })
      .catch((errors) => {
        // console.log("fds");

        console.log(errors);

        // Swal.fire({ titleText: errors[0].msg });
      })
      .finally(() => onClose());
  };

  const onLogin: SubmitHandler<Logininputs> = (data) => {
    const formData = {
      email: data.email,
      password: data.password,
    };
    axios
      .post(`http://localhost:5000/api/auth`, { ...formData })
      .then((response) => {
        appState.token.set(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        onClose();
      });
  };

  const { register, handleSubmit } = useForm();
  return (
    <div className={LoginInStyle.contianer}>
      {formType === "Login" && (
        <form className={LoginInStyle.form} onSubmit={handleSubmit(onLogin)}>
          <div className={LoginInStyle.form__group}>
            <input
              type="email"
              {...register("email")}
              id="email"
              placeholder="Enter Your Email"
            />
            <label htmlFor="email">Enter Your Email</label>
          </div>
          <div className={LoginInStyle.form__group}>
            <input
              type="password"
              id="passowrd2"
              placeholder="Enter Your Password Again"
              {...register("password")}
            />
            <label htmlFor="passowrd2">Enter Your Password Again</label>
          </div>
          <button type="submit">Login</button>
        </form>
      )}
      {formType === "Signup" && (
        <form
          className={LoginInStyle.contianer}
          onSubmit={handleSubmit(onSignup)}
        >
          <div className={LoginInStyle.form__group}>
            <input
              type="text"
              id="username"
              placeholder="Enter Your Username"
              {...register("username")}
            />
            <label htmlFor="username">Enter Your Username</label>
          </div>
          <div className={LoginInStyle.form__group}>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter Your Email"
            />
            <label htmlFor="username">Enter Your Email</label>
          </div>
          <div className={LoginInStyle.form__group}>
            <input
              type="number"
              maxLength={10}
              id="number"
              placeholder="Enter Your Mobile No."
              {...register("number")}
            />
            <label htmlFor="number">Enter Your Mobile No.</label>
          </div>
          <div className={LoginInStyle.form__group}>
            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              {...register("password")}
            />
            <label htmlFor="password">Enter Your Password</label>
          </div>
          <div className={LoginInStyle.form__group}>
            <input
              type="password"
              id="passowrd2"
              placeholder="Enter Your Password Again"
              {...register("confirmpassword")}
            />
            <label htmlFor="passowrd2">Enter Your Password Again</label>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Index;
