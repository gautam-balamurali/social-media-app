import axios from "axios";

export const loginService = (loginDetails) =>
  axios.post("/api/auth/login", loginDetails);

//TODO: Need to look into this later  
export const signUpService = (signUpDetails) =>
  axios.post("/api/auth/signup", signUpDetails);
