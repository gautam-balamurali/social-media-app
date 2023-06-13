import axios from "axios";

export const followUserService = (followUserId, authorization) => {
  return axios.post(
    `/api/users/follow/${followUserId}`,
    {},
    { headers: { authorization } }
  );
};

export const unfollowUserService = (followUserId, authorization) =>
  axios.post(
    `/api/users/unfollow/${followUserId}`,
    {},
    { headers: { authorization } }
  );
