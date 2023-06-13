import axios from "axios";

export const getAllUsersService = () => axios.get("/api/users");

export const getUserService = (userId) => axios.get(`/api/users/${userId}`);

export const editUserService = (userData, authorization) =>
  axios.post(
    "/api/users/edit",
    { userData },
    {
      headers: { authorization },
    }
  );
