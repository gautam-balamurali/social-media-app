import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import {
  FaHeart,
  FaRegHeart,
  FaRegUserCircle,
  FaUserCircle,
} from "react-icons/fa";

import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <div className="nav-link" onClick={() => navigate("/")}>
            {location.pathname === "/" ? (
              <AiFillHome className="nav-item" title="Home" size={24} />
            ) : (
              <AiOutlineHome className="nav-item" title="Home" size={24} />
            )}
          </div>
        </li>
        <li>
          <div className="nav-link" onClick={() => navigate("/explore")}>
            {location.pathname === "/explore" ? (
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
            {location.pathname === "/bookmarks" ? (
              <BsBookmarkFill
                className="nav-item"
                title="Bookmarks"
                size={24}
              />
            ) : (
              <BsBookmark className="nav-item" title="Bookmarks" size={24} />
            )}
          </div>
        </li>
        <li>
          <div className="nav-link" onClick={() => navigate("/liked-posts")}>
            {location.pathname === "/liked-posts" ? (
              <FaHeart className="nav-item" title="Liked Posts" size={24} />
            ) : (
              <FaRegHeart className="nav-item" title="Liked Posts" size={24} />
            )}
          </div>
        </li>
        <li>
          <div className="nav-link" onClick={() => navigate("/user-profile")}>
            {location.pathname === "/user-profile" ? (
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
