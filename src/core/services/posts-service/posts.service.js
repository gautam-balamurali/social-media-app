import axios from "axios";

//This API call gets all posts from the db.
export const getAllPostsService = () => axios.get("/api/posts");

//This API call gets post by postId from the db.
export const getPostService = (postId) => axios.get(`/api/posts/${postId}`);

//This API call gets posts by username from the db.
export const getAllPostsOfUserService = (username) =>
  axios.get(`/api/posts/user/${username}`);

//This API call creates a new post to the user's db.
export const addPostService = (postData, authorization) =>
  axios.post("/api/posts", { postData }, { headers: { authorization } });

//This API call deletes a post from the user's db.
export const deletePostService = (postId, authorization) =>
  axios.delete(`/api/posts/${postId}`, { headers: { authorization } });

//This API call edits a post of the user.
export const editPostService = (postData, authorization) =>
  axios.post(
    `/api/posts/edit/${postData._id}`,
    { postData },
    { headers: { authorization } }
  );
