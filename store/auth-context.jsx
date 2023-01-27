import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuth: false,
  auth: () => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState();

 

  const auth = (token) => {
    setToken(token);
    AsyncStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    AsyncStorage.removeItem('token')
  };

  const value = {
    token: token,
    isAuth: !!token,
    auth: auth,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
