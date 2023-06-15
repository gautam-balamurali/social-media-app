import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Signup.css";
import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";
import InputField from "components/shared/input-field-component/InputField";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "components/shared/button-component/Button";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, signUpUser } = useAuthentication();

  const [signUpCredentials, setSignUpCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const guestSignUpCredentials = {
    firstName: "John",
    lastName: "Doe",
    email: `${Math.floor(Math.random() * 10)}johndoe${Math.floor(
      Math.random() * 100
    )}@neog.camp`,
    username: `${Math.floor(Math.random() * 10)}johndoe${Math.floor(
      Math.random() * 100
    )}`,
    password: "johnDoe",
    confirmPassword: "johnDoe",
  };

  const signUpCredentialsChangeHandler = (event) => {
    const { name, value } = event.target;
    setSignUpCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const randomCredentialsClickHandler = () => {
    setSignUpCredentials((prev) => ({ ...prev, ...guestSignUpCredentials }));
  };

  const signUpHandler = async (signUpCredentials) => {
    const userDetails = await signUpUser(signUpCredentials);
    if (userDetails) {
      console.log("hello signup is successfull!");
      console.log({ userDetails });
    } else {
      console.error("Signup failed!");
    }
  };

  const submitClickHandler = (event) => {
    event.preventDefault();
    signUpCredentials.password === signUpCredentials.confirmPassword
      ? signUpHandler(signUpCredentials)
      : console.error("Passwords don't match, please try again!");
  };

  const toggleShowHidePassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (token)
      navigate(location?.state?.from.pathname || "/", {
        replace: true,
      });
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="signup-page">
      <div className="signup-card">
        <form
          className="signup-content"
          onSubmit={submitClickHandler}
          autoComplete="off"
        >
          <h2>Sign Up</h2>
          <div className="name-inpt-section">
            <div className="firstName-section">
              <InputField
                className={"firstName-txt-inpt"}
                label={"First Name"}
                label_class={"firstName"}
                type={"text"}
                name={"firstName"}
                value={signUpCredentials.firstName}
                placeholder={"John"}
                onChangeFunction={signUpCredentialsChangeHandler}
                required={true}
              />
            </div>
            <div className="lastName-section">
              <InputField
                className={"lastName-txt-inpt"}
                label={"Last Name"}
                label_class={"lastName"}
                type={"text"}
                name={"lastName"}
                value={signUpCredentials.lastName}
                placeholder={"Doe"}
                onChangeFunction={signUpCredentialsChangeHandler}
                required={true}
              />
            </div>
          </div>
          <div className="email-username-container">
            <div className="email-section">
              <InputField
                className={"email-txt-inpt"}
                label={"Email"}
                label_class={"email"}
                type={"email"}
                name={"email"}
                value={signUpCredentials.email}
                placeholder={"johndoe@gmail.com"}
                onChangeFunction={signUpCredentialsChangeHandler}
                required={true}
              />
            </div>
            <div className="username-section">
              <InputField
                className={"username-txt-inpt"}
                label={"Username"}
                label_class={"username"}
                type={"text"}
                name={"username"}
                value={signUpCredentials.username}
                placeholder={"johndoe123"}
                onChangeFunction={signUpCredentialsChangeHandler}
                required={true}
              />
            </div>
          </div>
          <div className="password-setion-container">
            <div className="pswd-section">
              <div
                className="eye-icon"
                aria-hidden="true"
                onClick={toggleShowHidePassword}
              >
                {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </div>
              <InputField
                className={"pswd-txt-inpt"}
                label={"Password"}
                label_class={"pswd"}
                type={showPassword ? "text" : "password"}
                name={"password"}
                value={signUpCredentials.password}
                placeholder={"****************"}
                onChangeFunction={signUpCredentialsChangeHandler}
                required={true}
              />
            </div>
            <div className="pswd-section">
              <div
                className="eye-icon"
                aria-hidden="true"
                onClick={toggleShowHidePassword}
              >
                {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </div>
              <InputField
                className={"pswd-txt-inpt"}
                label={"Confirm Password"}
                label_class={"pswd"}
                type={showPassword ? "text" : "password"}
                name={"confirmPassword"}
                value={signUpCredentials.confirmPassword}
                placeholder={"****************"}
                onChangeFunction={signUpCredentialsChangeHandler}
                required={true}
              />
            </div>
          </div>
          <Button type={"submit"} className={"signup-btn"} label={"Sign Up"} />
        </form>
        <Button
          clickHandlerFunction={randomCredentialsClickHandler}
          className={"signup-btn"}
          label={"Generate Random Credentials"}
        />
        <p className="form-info-last">
          Already have an account?
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <span className="login"> Log In </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
