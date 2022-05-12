import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => {
      unsubscribed();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
