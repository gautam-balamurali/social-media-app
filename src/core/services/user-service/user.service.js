import axios from "axios";

//This API call gets all users in the db.
export const getAllUsersService = () => axios.get("/api/users");

//This API call gets a user from the db.
export const getUserService = (userId) => axios.get(`/api/users/${userId}`);

//This API call is responsible for editing details of the user.
export const editUserService = (userData, authorization) =>
  axios.post(
    "/api/users/edit",
    { userData },
    {
      headers: { authorization },
    }
  );
