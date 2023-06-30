import "./SecondSidebar.css";
import SearchBar from "./search-bar/SearchBar";
import UsersFollowBar from "./users-follow-bar/UsersFollowBar";

const SecondSidebar = () => {
  return (
    <aside className="second-sidebar-container">
      <div className="second-sidebar-contents">
        <SearchBar />
        <UsersFollowBar />
      </div>
    </aside>
  );
};

export default SecondSidebar;
