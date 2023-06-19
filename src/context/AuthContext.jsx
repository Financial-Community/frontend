import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {auth} from '../config/FirebaseConfig';
import {loginWithEmail, logout, signUpWithEmail, resetPassword} from "../services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
  }, []);


  const isAuthenticated = currentUser ?? false;

  const value = useMemo(() => {
    return {
      currentUser,
      setCurrentUser,
      signUpWithEmail,
      loginWithEmail,
      logout,
      resetPassword,
      isAuthenticated
    };
  }, [currentUser, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
