import SearchBar from "components/shared/search-bar-component/SearchBar";
import UsersFollowBar from "./users-follow-bar/UsersFollowBar";
import "./SecondSidebar.css";

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
