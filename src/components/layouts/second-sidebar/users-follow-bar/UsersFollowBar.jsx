import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";

import { useUsers } from "core/contexts/users-context/UsersContext";
import Button from "components/shared/button-component/Button";
import "./UsersFollowBar.css";
import { useRef, useState } from "react";
import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";

const UsersFollowBar = () => {
  const { users } = useUsers();
  const { user: currentUser } = useAuthentication();
  const suggestedUsersToFollow = users.filter(
    (user) => user?.username !== currentUser?.username
  );

  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  if (suggestedUsersToFollow.length < 1) return null;

  return (
    <div className="users-follow-bar-container">
      <h3>Suggested follows</h3>
      {scrollPosition > 0 && (
        <button className="carousel-button left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>
      )}
      <div className="users-follow-bar-section" ref={containerRef}>
        {suggestedUsersToFollow.map((user) => (
          <div key={user.username} className="suggested-users-section">
            <div className="suggested-user-details">
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
            />
          </div>
        ))}
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
