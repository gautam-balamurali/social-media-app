import axios from "axios";

//This API logs in a registered user from the database.
export const loginService = (loginDetails) =>
  axios.post("/api/auth/login", loginDetails);

//This API call creates and signs up a new user to the database.
//TODO: Need to look into this later
export const signUpService = (signUpDetails) =>
  axios.post("/api/auth/signup", signUpDetails);
