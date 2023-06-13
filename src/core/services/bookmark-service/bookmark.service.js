import axios from "axios";

export const addToBookmarkService = (postId, authorization) =>
  axios.post(
    `/api/users/bookmark/${postId}`,
    {},
    {
      headers: { authorization },
    }
  );

export const removeFromBookmarkService = (postId, authorization) =>
  axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    {
      headers: { authorization },
    }
  );

export const getBookmarkPostsService = (authorization) =>
  axios.get("/api/users/bookmark", {
    headers: { authorization },
  });
