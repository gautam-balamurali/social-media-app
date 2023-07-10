/* eslint-disable */

import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { RiHeartsLine, RiHeartsFill } from "react-icons/ri";

import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useAuthentication();
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveRoute = (pathname) => location.pathname === pathname;

  return (
    <aside className="sidebar">
      <nav className="sidebar-navigation">
        <ul>
          <li
            className={isActiveRoute("/") ? "active" : ""}
            onClick={() => navigate("/")}
          >
            <div className="nav-link cursor-pointer">
              {isActiveRoute("/") ? (
                <AiFillHome className="nav-item" title="Home" size={24} />
              ) : (
                <AiOutlineHome className="nav-item" title="Home" size={24} />
              )}
            </div>
            <p className="ls-view">Home</p>
          </li>
          <li
            className={isActiveRoute("/explore") ? "active" : ""}
            onClick={() => navigate("/explore")}
          >
            <div className="nav-link cursor-pointer">
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
            <p className="ls-view">Explore</p>
          </li>
          <li
            className={isActiveRoute("/bookmarks") ? "active" : ""}
            onClick={() => navigate("/bookmarks")}
          >
            <div className="nav-link cursor-pointer">
              {isActiveRoute("/bookmarks") ? (
                <BsBookmarksFill className="nav-item" title="Home" size={24} />
              ) : (
                <BsBookmarks className="nav-item" title="Bookmarks" size={24} />
              )}
            </div>
            <p className="ls-view">Bookmarks</p>
          </li>
          <li
            className={isActiveRoute("/liked-posts") ? "active" : ""}
            onClick={() => navigate("/liked-posts")}
          >
            <div className="nav-link cursor-pointer">
              {isActiveRoute("/liked-posts") ? (
                <RiHeartsFill
                  className="nav-item"
                  title="Liked Posts"
                  size={24}
                />
              ) : (
                <RiHeartsLine className="nav-item" title="Home" size={24} />
              )}
            </div>
            <p className="ls-view">Liked Posts</p>
          </li>
          <li
            className={
              isActiveRoute(`/profile/${user?.username}`) ? "active" : ""
            }
            onClick={() => navigate(`/profile/${user?.username}`)}
          >
            <div className="nav-link cursor-pointer">
              {isActiveRoute(`/profile/${user?.username}`) ? (
                <FaUserCircle className="nav-item" title="Home" size={24} />
              ) : (
                <FaRegUserCircle
                  className="nav-item"
                  title="Profile"
                  size={24}
                />
              )}
            </div>
            <p className="ls-view">Profile</p>
          </li>
        </ul>
      </nav>
      <div className="current-user-details">
        <img
          className="current-user-avatar cursor-pointer"
          src={user?.picUrl}
          alt={user?.username}
          onClick={() => navigate(`/profile/${user?.username}`)}
        />
        <div
          onClick={() => navigate(`/profile/${user?.username}`)}
          className="current-user-info cursor-pointer"
        >
          <h4>{`${user?.firstName} ${user?.lastName}`}</h4>
          <p>@{user?.username}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
