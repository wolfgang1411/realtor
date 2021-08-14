import { useState as useHookState } from "@hookstate/core";
import Model from "../Login/Index";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import NavbarStyle from "./Navbar.module.scss";
import { AppState } from "../../state/AppState";

const MySwal = withReactContent(Swal);

const Index = () => {
  const appState = useHookState(AppState);
  return (
    <nav className={NavbarStyle.container}>
      <div className={NavbarStyle.Search}>
        <input type="search" placeholder="Search Property" />
      </div>

      {appState.isAuthenticated.get() ? (
        <>
          <div className={NavbarStyle.addbtn}>
            <button
              type="button"
              onClick={() =>
                MySwal.fire({
                  html: (
                    <Model
                      formType="AddProperty"
                      onClose={() => MySwal.close()}
                    />
                  ),
                })
              }
            >
              Add Property
            </button>
          </div>
          <div className={NavbarStyle.logoutbtn}>
            <button
              type="button"
              onClick={() => {
                appState.user.set(undefined);
                appState.isAuthenticated.set(false);
              }}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={NavbarStyle.authbtn}>
            <button
              type="button"
              className={NavbarStyle.authbtn__signup}
              onClick={() => {
                MySwal.fire({
                  showConfirmButton: false,
                  html: (
                    <Model formType="Signup" onClose={() => MySwal.close()} />
                  ),
                });
              }}
            >
              SignUp
            </button>
            <button
              type="button"
              className={NavbarStyle.authbtn__login}
              onClick={() => {
                MySwal.fire({
                  html: (
                    <Model formType="Login" onClose={() => MySwal.close()} />
                  ),
                });
              }}
            >
              Login
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Index;
