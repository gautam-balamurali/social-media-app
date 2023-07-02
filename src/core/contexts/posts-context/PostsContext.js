import { createContext, useContext, useEffect, useReducer } from "react";

import { postsReducer } from "core/reducers/posts-reducer/PostsReducerFunction";
import { postsReducerInitialState } from "core/reducers/posts-reducer/PostsReducerInitialState";
import { getAllPostsService } from "core/services/posts-service/posts.service";
import { useAuthentication } from "../authentication-context/AuthenticationContext";
import {
  addToBookmarkService,
  getBookmarkPostsService,
  removeFromBookmarkService,
} from "core/services/bookmark-service/bookmark.service";
import {
  dislikePostService,
  likePostService,
} from "core/services/like-dislike-posts-service/likeDislikePosts.service";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [state, postsDispatch] = useReducer(
    postsReducer,
    postsReducerInitialState
  );

  const { token } = useAuthentication();

  const fetchAllPosts = async () => {
    try {
      const response = await getAllPostsService();
      console.log({ response }, "fetchAllPostsService");
      if (response.status === 200 || response.status === 201) {
        postsDispatch({
          type: "FETCH_ALL_POSTS",
          payload: response?.data?.posts,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const appliedFilterPosts = (posts) => {
    switch (state.sortFilterType) {
      case "trending":
        return posts?.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
      case "latest":
        return posts?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return posts?.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      default:
        return posts;
    }
  };

  const fetchAllBookmarkedPosts = async () => {
    try {
      const response = await getBookmarkPostsService(token);
      console.log({ response }, "fetchBookmarkedPosts");
      if (response.status === 200 || response.status === 201) {
        postsDispatch({
          type: "FETCH_ALL_BOOKMARKS",
          payload: response?.data?.bookmarks,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addPostToBookmarks = async (postId) => {
    try {
      const response = await addToBookmarkService(postId, token);
      console.log({ response }, "addPostToBookmarks");
      if (response.status === 200 || response.status === 201) {
        postsDispatch({
          type: "ADD_TO_BOOKMARKS",
          payload: response?.data?.bookmarks,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removePostFromBookmarks = async (postId) => {
    try {
      const response = await removeFromBookmarkService(postId, token);
      console.log({ response }, "removePostFromBookmarks");
      if (response.status === 200 || response.status === 201) {
        postsDispatch({
          type: "REMOVE_FROM_BOOKMARKS",
          payload: response?.data?.bookmarks,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const likePost = async (postId) => {
    try {
      const response = await likePostService(postId, token);
      console.log({ response }, "likePostResponse");
      if (response.status === 200 || response.status === 201) {
        postsDispatch({
          type: "LIKE_POST",
          payload: response?.data?.posts,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const dislikePost = async (postId) => {
    try {
      const response = await dislikePostService(postId, token);
      console.log({ response }, "dislikePostResponse");
      if (response.status === 200 || response.status === 201) {
        postsDispatch({
          type: "DISLIKE_POST",
          payload: response?.data?.posts,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const applyFiltersClickHandler = (filterType) => {
    postsDispatch({ type: "LOADER_INITIATED" });
    postsDispatch({ type: "APPLY_FILTERS", payload: filterType });
    postsDispatch({ type: "LOADER_STOPPED" });
  };

  useEffect(() => {
    if (token) {
      postsDispatch({ type: "LOADER_INITIATED" });
      fetchAllPosts();
      fetchAllBookmarkedPosts();
      postsDispatch({ type: "LOADER_STOPPED" });
    } // eslint-disable-next-line
  }, [token]);

  return (
    <PostsContext.Provider
      value={{
        ...state,
        postsDispatch,
        appliedFilterPosts,
        addPostToBookmarks,
        removePostFromBookmarks,
        likePost,
        dislikePost,
        applyFiltersClickHandler,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
