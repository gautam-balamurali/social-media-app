/* eslint-disable */

import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import { useUsers } from "core/contexts/users-context/UsersContext";
import Button from "components/shared/button-component/Button";
import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";
import "./UsersFollowBar.css";

const UsersFollowBar = () => {
  const { users, followUser } = useUsers();
  const { user: currentUser } = useAuthentication();

  const suggestedUsersToFollow = users.filter(
    (user) =>
      user?.username !== currentUser?.username &&
      !currentUser?.following.find(
        ({ username }) => username === user?.username
      )
  );

  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const navigate = useNavigate();

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: 0,
        left: -350,
        behavior: "smooth",
      });
      setScrollPosition(scrollPosition - 1);
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: 0,
        left: 350,
        behavior: "smooth",
      });
      setScrollPosition(scrollPosition + 1);
    }
  };

  return (
    <div className="users-follow-bar-container">
      <h3>Suggested follows</h3>
      {scrollPosition > 0 && (
        <button className="carousel-button left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>
      )}
      <div className="users-follow-bar-section" ref={containerRef}>
        {suggestedUsersToFollow?.length > 0 &&
          suggestedUsersToFollow.map((user) => (
            <div key={user.username} className="suggested-users-section">
              <div
                onClick={() => navigate(`/profile/${user?.username}`)}
                className="suggested-user-details cursor-pointer"
              >
                <img
                  className="suggested-user-avatar"
                  src={user?.picUrl}
                  alt={user?.username}
                />
                <div className="suggested-user-info">
                  <h4>{`${user?.firstName} ${user?.lastName}`}</h4>
                  <span>@{user?.username}</span>
                </div>
              </div>
              <Button
                label={
                  <>
                    <span className="btn-icon">
                      <FaPlus />
                    </span>
                    <span className="btn-txt">Follow</span>
                  </>
                }
                clickHandlerFunction={followUser}
                params={user._id}
              />
            </div>
          ))}
        {suggestedUsersToFollow?.length < 1 && (
          <div className="no-follows-found">
            <h4>None. You are following everyone!💁🏼</h4>
          </div>
        )}
      </div>
      {scrollPosition < suggestedUsersToFollow.length - 1 && (
        <button className="carousel-button right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default UsersFollowBar;
