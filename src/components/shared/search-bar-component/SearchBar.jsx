/* eslint-disable */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../input-field-component/InputField";
import { useUsers } from "core/contexts/users-context/UsersContext";
import "./SearchBar.css";

const SearchBar = () => {
  const { users } = useUsers();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(searchText.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const matchingUsers =
    debouncedSearchText.length > 0
      ? users.filter(({ firstName, lastName, username }) => {
          const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();
          return (
            username?.toLowerCase().includes(debouncedSearchText) ||
            fullName.toLowerCase().includes(debouncedSearchText)
          );
        })
      : [];

  const handleSearchInput = (event) => setSearchText(event.target.value);

  const handleSelectUser = (username) => {
    setSearchText("");
    setDebouncedSearchText("");
    navigate(`/profile/${username}`);
  };

  return (
    <div className="search-bar-container">
      <InputField
        className={"search-bar"}
        type={"text"}
        value={searchText}
        onChangeFunction={handleSearchInput}
        placeholder={"Search by username or name"}
      />

      {debouncedSearchText && (
        <div className="search-results" aria-label="Search results">
          {matchingUsers.length > 0 ? (
            matchingUsers.map((user) => (
              <button
                key={user._id}
                type="button"
                className="search-user-card"
                onClick={() => handleSelectUser(user.username)}
              >
                <img
                  className="search-user-avatar"
                  src={user.picUrl}
                  alt={user.username}
                />
                <div className="search-user-info">
                  <span className="search-user-name">{`${user.firstName} ${user.lastName}`}</span>
                  <span className="search-user-handle">@{user.username}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="search-no-results">No user found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
