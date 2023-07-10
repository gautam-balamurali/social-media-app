/* eslint-disable */

export const postsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOADER_INITIATED":
      return { ...state, isLoading: true };
    case "LOADER_STOPPED":
      return { ...state, isLoading: false };
    case "FETCH_ALL_POSTS":
      return { ...state, posts: [...payload] };
    case "CREATE_POST":
      return { ...state, posts: [...payload] };
    case "LIKE_POST":
      return { ...state, posts: [...payload] };
    case "DISLIKE_POST":
      return { ...state, posts: [...payload] };
    case "EDIT_POST":
      return { ...state, posts: [...payload] };
    case "ADD_TO_BOOKMARKS":
      return { ...state, bookmarks: [...payload] };
    case "REMOVE_FROM_BOOKMARKS":
      return { ...state, bookmarks: [...payload] };
    case "FETCH_ALL_BOOKMARKS":
      return { ...state, bookmarks: [...payload] };
    case "APPLY_FILTERS":
      return { ...state, sortFilterType: payload };
    default:
      return state;
  }
};
