import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import {
  FaHeart,
  FaRegHeart,
  FaRegUserCircle,
  FaUserCircle,
} from "react-icons/fa";

import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useAuthentication();
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveRoute = (pathname) => location.pathname === pathname;

  return (
    <div className="sidebar">
      <nav className="sidebar-navigation">
        <ul>
          <li
            className={isActiveRoute("/") ? "active" : ""}
            onClick={() => navigate("/")}
          >
            <div className="nav-link">
              {isActiveRoute("/") ? (
                <AiFillHome className="nav-item" title="Home" size={24} />
              ) : (
                <AiOutlineHome className="nav-item" title="Home" size={24} />
              )}
            </div>
            <p>Home</p>
          </li>
          <li
            className={isActiveRoute("/explore") ? "active" : ""}
            onClick={() => navigate("/explore")}
          >
            <div className="nav-link">
              {isActiveRoute("/explore") ? (
                <MdExplore className="nav-item" title="Home" size={24} />
              ) : (
                <MdOutlineExplore
                  className="nav-item"
                  title="Explore"
                  size={24}
                />
              )}
            </div>
            <p>Explore</p>
          </li>
          <li
            className={isActiveRoute("/bookmarks") ? "active" : ""}
            onClick={() => navigate("/bookmarks")}
          >
            <div className="nav-link">
              {isActiveRoute("/bookmarks") ? (
                <BsBookmarkFill className="nav-item" title="Home" size={24} />
              ) : (
                <BsBookmark className="nav-item" title="Bookmarks" size={24} />
              )}
            </div>
            <p>Bookmarks</p>
          </li>
          <li
            className={isActiveRoute("/liked-posts") ? "active" : ""}
            onClick={() => navigate("/liked-posts")}
          >
            <div className="nav-link">
              {isActiveRoute("/liked-posts") ? (
                <FaHeart className="nav-item" title="Liked Posts" size={24} />
              ) : (
                <FaRegHeart className="nav-item" title="Home" size={24} />
              )}
            </div>
            <p>Liked Posts</p>
          </li>
          <li
            className={isActiveRoute("/user-profile") ? "active" : ""}
            onClick={() => navigate("/user-profile")}
          >
            <div className="nav-link">
              {isActiveRoute("/user-profile") ? (
                <FaUserCircle className="nav-item" title="Home" size={24} />
              ) : (
                <FaRegUserCircle
                  className="nav-item"
                  title="Profile"
                  size={24}
                />
              )}
            </div>
            <p>Profile</p>
          </li>
        </ul>
      </nav>
      <div className="current-user-details">
        <img
          className="current-user-avatar"
          src={user?.picUrl}
          alt={user?.username}
        />
        <div className="current-user-info">
          <h4>{`${user?.firstName} ${user?.lastName}`}</h4>
          <p>@{user?.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
