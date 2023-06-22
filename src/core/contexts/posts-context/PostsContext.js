import { createContext, useEffect, useReducer, useState } from "react";

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
      console.log({ response });
    } catch (error) {
      console.error(error);
    } finally {
      postsDispatch({ type: "LOADER_STOPPED" });
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllPosts();
    }
  }, [token]);

  return (
    <PostsContext.Provider value={{ ...state, postsDispatch }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useState(PostsContext);
