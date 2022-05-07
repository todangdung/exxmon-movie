import React from "react";
import "./App.scss";

import { BrowserRouter } from "react-router-dom";

import { HeaderLogo, LeftSide, Footer } from "./components";

import Routers from "./config/Routers";

import AuthProvider from "./context/AuthProvider";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HeaderLogo />
        <div className="app">
          <LeftSide />
          <Routers />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
