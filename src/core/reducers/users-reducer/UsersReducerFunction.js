/* eslint-disable */

export const usersReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_ALL_USERS":
      return { ...state, users: [...payload] };
    case "UPDATE_USERS":
      return { ...state, users: [...payload] };
    default:
      return state;
  }
};
