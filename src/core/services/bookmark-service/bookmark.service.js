import axios from "axios";

//This API call adds a post to user bookmarks.
export const addToBookmarkService = (postId, authorization) =>
  axios.post(
    `/api/users/bookmark/${postId}`,
    {},
    {
      headers: { authorization },
    }
  );

//This API call removes a post from user bookmarks.
export const removeFromBookmarkService = (postId, authorization) =>
  axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    {
      headers: { authorization },
    }
  );

//This API call gets all user bookmarked posts from the db.
export const getBookmarkPostsService = (authorization) =>
  axios.get("/api/users/bookmark", {
    headers: { authorization },
  });
