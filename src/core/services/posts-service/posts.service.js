import axios from "axios";

export const getAllPostsService = () => axios.get("/api/posts");

export const getPostService = (postId) => axios.get(`/api/posts/${postId}`);

export const getAllPostsOfUserService = (username) =>
  axios.get(`/api/posts/user/${username}`);

export const addPostService = (postData, authorization) =>
  axios.post("/api/posts", { postData }, { headers: { authorization } });

export const editPostService = (postData, authorization) =>
  axios.post(
    `/api/posts/edit/${postData._id}`,
    { postData },
    { headers: { authorization } }
  );

export const deletePostService = (postId, authorization) =>
  axios.delete(`/api/posts/${postId}`, { headers: { authorization } });
