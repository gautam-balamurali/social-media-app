import axios from "axios";

export const likePostService = (postId, authorization) =>
  axios.post(`/api/posts/like/${postId}`, {}, { headers: { authorization } });

export const dislikePostService = (postId, authorization) =>
  axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    {
      headers: { authorization },
    }
  );
