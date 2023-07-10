/* eslint-disable */

import InputField from "../input-field-component/InputField";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <InputField
        className={"search-bar"}
        type={"text"}
        placeholder={"Search by username or name"}
      />
    </div>
  );
};

export default SearchBar;
