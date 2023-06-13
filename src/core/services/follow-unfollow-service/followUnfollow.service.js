import axios from "axios";

//This API call is responsible for follow action by the user.
export const followUserService = (followUserId, authorization) => {
  return axios.post(
    `/api/users/follow/${followUserId}`,
    {},
    { headers: { authorization } }
  );
};

//This API call is responsible for unfollow action by the user.
export const unfollowUserService = (followUserId, authorization) =>
  axios.post(
    `/api/users/unfollow/${followUserId}`,
    {},
    { headers: { authorization } }
  );
