/* eslint-disable */

import { useNavigate } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <img
        className="App-logo"
        src="https://res.cloudinary.com/dbe8yf165/image/upload/v1688964194/twitlyx/logo-2_ihpmf7.png"
        alt="twitlyx-logo"
        onClick={() => navigate("/")}
      />
      <h1 onClick={() => navigate("/")}>TwitLyx</h1>
    </header>
  );
};

export default Header;
