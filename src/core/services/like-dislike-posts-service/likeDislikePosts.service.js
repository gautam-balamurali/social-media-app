import axios from "axios";

//This API call likes a post of the user.
export const likePostService = (postId, authorization) =>
  axios.post(`/api/posts/like/${postId}`, {}, { headers: { authorization } });

//This API call dislikes/unlikes a liked post of the user.
export const dislikePostService = (postId, authorization) =>
  axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    {
      headers: { authorization },
    }
  );
