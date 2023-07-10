/* eslint-disable */

import { createContext, useContext, useEffect, useReducer } from "react";

import { usersReducer } from "core/reducers/users-reducer/UsersReducerFunction";
import { usersReducerInitialState } from "core/reducers/users-reducer/UsersReducerInitialState";
import {
  editUserService,
  getAllUsersService,
} from "core/services/user-service/user.service";
import {
  followUserService,
  unfollowUserService,
} from "core/services/follow-unfollow-service/followUnfollow.service";
import { useAuthentication } from "../authentication-context/AuthenticationContext";
import { toast } from "react-hot-toast";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [state, usersDispatch] = useReducer(
    usersReducer,
    usersReducerInitialState
  );

  const { token, syncUserDetails } = useAuthentication();

  const fetchAllUsers = async () => {
    try {
      const response = await getAllUsersService();
      if (response.status === 200 || response.status === 201)
        usersDispatch({
          type: "FETCH_ALL_USERS",
          payload: response.data.users,
        });
    } catch (error) {
      console.error(error);
    }
  };

  const followUser = async (followUserId) => {
    try {
      const response = await followUserService(followUserId, token);
      if (response.status === 200 || response.status === 201) {
        const { followUser, user } = response?.data;
        const updatedUsersList = state.users.map(
          (userDetails) =>
            [followUser, user].find(({ _id }) => _id === userDetails._id) ||
            userDetails
        );
        usersDispatch({
          type: "UPDATE_USERS",
          payload: updatedUsersList,
        });
        syncUserDetails(token, user);
        toast.success(`Followed ${followUser.username} successfully!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops! Operation failed!");
    }
  };

  const unfollowUser = async (followUserId) => {
    try {
      const response = await unfollowUserService(followUserId, token);
      if (response.status === 200 || response.status === 201) {
        const { followUser, user } = response?.data;
        const updatedUsersList = state.users.map(
          (userDetails) =>
            [followUser, user].find(({ _id }) => _id === userDetails._id) ||
            userDetails
        );
        usersDispatch({
          type: "UPDATE_USERS",
          payload: updatedUsersList,
        });
        syncUserDetails(token, user);
        toast.success(`Unfollowed ${followUser.username} successfully!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops! Operation failed!");
    }
  };

  const editUser = async (userData) => {
    try {
      const response = await editUserService(userData, token);
      if (response.status === 200 || response.status === 201) {
        const { user } = response?.data;
        const updatedUsersList = state.users.map((userDetails) =>
          userDetails.username === user.username
            ? { ...userDetails, ...user }
            : userDetails
        );
        usersDispatch({
          type: "UPDATE_USERS",
          payload: updatedUsersList,
        });
        syncUserDetails(token, user);
        toast.success(`Profile updated successfully!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops! Operation failed!");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{ ...state, usersDispatch, followUser, unfollowUser, editUser }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
