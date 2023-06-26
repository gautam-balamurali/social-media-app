import { createContext, useContext, useEffect, useReducer } from "react";

import { postsReducer } from "core/reducers/posts-reducer/PostsReducerFunction";
import { postsReducerInitialState } from "core/reducers/posts-reducer/PostsReducerInitialState";
import { getAllPostsService } from "core/services/posts-service/posts.service";
import { useAuthentication } from "../authentication-context/AuthenticationContext";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [state, postsDispatch] = useReducer(
    postsReducer,
    postsReducerInitialState
  );

  const { token } = useAuthentication();

  const fetchAllPosts = async () => {
    postsDispatch({ type: "LOADER_INITIATED" });
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
    } finally {
      postsDispatch({ type: "LOADER_STOPPED" });
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

  useEffect(() => {
    if (token) {
      fetchAllPosts();
    }
  }, [token]);

  return (
    <PostsContext.Provider
      value={{ ...state, postsDispatch, appliedFilterPosts }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
