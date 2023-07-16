/* eslint-disable */

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./Login.css";
import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";
import InputField from "components/shared/input-field-component/InputField";
import Button from "components/shared/button-component/Button";
import { toast } from "react-hot-toast";

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { token, loginUser } = useAuthentication();

  const guestLoginCredentials = {
    username: "gautam.bm",
    password: "gautam123",
  };

  const loginCredentialsChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const loginClickHandler = async (loginCredentials) => {
    const userDetails = await loginUser(loginCredentials);
    if (userDetails) {
      toast.success(`Welcome back, ${userDetails?.firstName}!`);
    } else {
      toast.error("Login failed! Please try again with correct credentials.");
    }
  };

  const loginAsAGuestClickHandler = () => {
    setLoginCredentials((prev) => ({ ...prev, ...guestLoginCredentials }));
    loginClickHandler(guestLoginCredentials);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    loginClickHandler(loginCredentials);
  };

  const toggleShowHidePassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (token)
      navigate(location?.state?.from.pathname || "/", { replace: true });
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="login-page">
      <div className="login-card">
        <form
          className="login-content"
          onSubmit={submitFormHandler}
          autoComplete="off"
        >
          <h2>Login</h2>
          <div className="username-login-section">
            <InputField
              className={"username-login-txt-inpt"}
              label={"Username"}
              label_class={"username-login"}
              type={"text"}
              name={"username"}
              value={loginCredentials.username}
              placeholder={"johndoe123"}
              onChangeFunction={loginCredentialsChangeHandler}
              required={true}
            />
          </div>
          <div className="pswd-login-section">
            <div
              className="eye-icon cursor-pointer"
              aria-hidden="true"
              onClick={toggleShowHidePassword}
            >
              {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </div>
            <InputField
              className={"pswd-login-txt-inpt"}
              label={"Password"}
              label_class={"pswd-login"}
              type={showPassword ? "text" : "password"}
              name={"password"}
              value={loginCredentials.password}
              placeholder={"****************"}
              onChangeFunction={loginCredentialsChangeHandler}
              required={true}
            />
          </div>
          <Button type={"submit"} className={"login-btn"} label={"Login"} />
        </form>
        <Button
          clickHandlerFunction={loginAsAGuestClickHandler}
          className={"login-btn"}
          label={"Login as Guest"}
        />
        <p className="form-info-last">
          Don't have an account?
          <Link to={"/sign-up"} style={{ textDecoration: "none" }}>
            <span className="sign-up"> Sign Up </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
