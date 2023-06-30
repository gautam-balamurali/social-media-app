import { createContext, useContext, useEffect, useReducer } from "react";

import { usersReducer } from "core/reducers/users-reducer/UsersReducerFunction";
import { usersReducerInitialState } from "core/reducers/users-reducer/UsersReducerInitialState";
import { getAllUsersService } from "core/services/user-service/user.service";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [state, usersDispatch] = useReducer(
    usersReducer,
    usersReducerInitialState
  );

  const fetchAllUsers = async () => {
    try {
      const response = await getAllUsersService();
      console.log({ response }, "fetchAllUsers");
      if (response.status === 200 || response.status === 201)
        usersDispatch({
          type: "FETCH_ALL_USERS",
          payload: response.data.users,
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ ...state, usersDispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
