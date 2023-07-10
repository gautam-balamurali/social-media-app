/* eslint-disable */

import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { RiHeartsLine, RiHeartsFill } from "react-icons/ri";

import "./Navbar.css";
import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthentication();

  const isActiveRoute = (pathname) => location.pathname === pathname;

  return (
    <nav className="navbar">
      <ul>
        <li>
          <div className="nav-link" onClick={() => navigate("/")}>
            {isActiveRoute("/") ? (
              <AiFillHome className="nav-item" title="Home" size={24} />
            ) : (
              <AiOutlineHome className="nav-item" title="Home" size={24} />
            )}
          </div>
        </li>
        <li>
          <div className="nav-link" onClick={() => navigate("/explore")}>
            {isActiveRoute("/explore") ? (
              <MdExplore className="nav-item" title="Explore" size={24} />
            ) : (
              <MdOutlineExplore
                className="nav-item"
                title="Explore"
                size={24}
              />
            )}
          </div>
        </li>
        <li>
          <div className="nav-link" onClick={() => navigate("/bookmarks")}>
            {isActiveRoute("/bookmarks") ? (
              <BsBookmarksFill
                className="nav-item"
                title="Bookmarks"
                size={24}
              />
            ) : (
              <BsBookmarks className="nav-item" title="Bookmarks" size={24} />
            )}
          </div>
        </li>
        <li>
          <div className="nav-link" onClick={() => navigate("/liked-posts")}>
            {isActiveRoute("/liked-posts") ? (
              <RiHeartsFill
                className="nav-item"
                title="Liked Posts"
                size={24}
              />
            ) : (
              <RiHeartsLine
                className="nav-item"
                title="Liked Posts"
                size={24}
              />
            )}
          </div>
        </li>
        <li>
          <div
            className="nav-link"
            onClick={() => navigate(`/profile/${user?.username}`)}
          >
            {isActiveRoute(`/profile/${user?.username}`) ? (
              <FaUserCircle className="nav-item" title="Profile" size={24} />
            ) : (
              <FaRegUserCircle className="nav-item" title="Profile" size={24} />
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
