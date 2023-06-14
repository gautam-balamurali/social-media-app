import { createContext, useContext, useState } from "react";

import {
  loginService,
  signUpService,
} from "core/services/authentication-service/authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({
    token: JSON.parse(localStorage.getItem("token")),
    user: JSON.parse(localStorage.getItem("user")),
  });

  const syncUserDetails = (token, user) => {
    setLoggedInUserDetails((prev) => ({
      ...prev,
      token,
      user,
    }));
  };

  const logOutUser = () => {
    setLoggedInUserDetails((prev) => ({ ...prev, token: "", user: null }));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const loginUser = async (loginDetails) => {
    try {
      const response = await loginService(loginDetails);
      const {
        data: { foundUser, encodedToken },
        status,
      } = response;
      if (status === 200) {
        localStorage.setItem("token", JSON.stringify(encodedToken));
        localStorage.setItem("user", JSON.stringify(foundUser));
        syncUserDetails(encodedToken, foundUser);
        return foundUser;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signUpUser = async (signUpDetails) => {
    try {
      const response = await signUpService(signUpDetails);
      const {
        data: { createdUser, encodedToken },
        status,
      } = response;
      if (status === 201) {
        syncUserDetails(encodedToken, createdUser);
        return createdUser;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{ ...loggedInUserDetails, loginUser, logOutUser, signUpUser }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthenticationContext);
