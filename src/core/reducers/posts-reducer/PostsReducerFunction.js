export const postsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOADER_INITIATED":
      return { ...state, isLoading: true };
    case "LOADER_STOPPED":
      return { ...state, isLoading: false };
    case "FETCH_ALL_POSTS":
      return { ...state, posts: [...payload] };
    default:
      return state;
  }
};
