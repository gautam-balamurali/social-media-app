/* eslint-disable */

import { useNavigate } from "react-router-dom";

import "./Header.css";
import Button from "components/shared/button-component/Button";
import { BiLogOut } from "react-icons/bi";
import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";

const Header = () => {
  const navigate = useNavigate();
  const { logOutUser } = useAuthentication();
  return (
    <header className="header">
      <div className="logo-app-name">
        <img
          className="App-logo"
          src="https://res.cloudinary.com/dbe8yf165/image/upload/v1688964194/twitlyx/logo-2_ihpmf7.png"
          alt="twitlyx-logo"
          onClick={() => navigate("/")}
        />
        <h1 onClick={() => navigate("/")}>TwitLyx</h1>
      </div>
      <Button
        label={
          <>
            <span className="profile-action-btn-icon">
              <BiLogOut size={18} />
            </span>
            <span className="profile-action-btn-txt">Logout</span>
          </>
        }
        className={"profile-action-default-btn header-logout"}
        clickHandlerFunction={logOutUser}
      />
    </header>
  );
};

export default Header;
