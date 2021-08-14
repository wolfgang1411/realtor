import React, { useEffect } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState as useHookState } from "@hookstate/core";
import { AppState } from "./state/AppState";
import { Auth } from "./utils/auth";

import HomePage from "./pages/Homepage";
import "./App.css";

function App() {
  const appState = useHookState(AppState);

  useEffect(() => {
    console.log("fds");
    Auth();
  }, [localStorage.getItem("token")]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
