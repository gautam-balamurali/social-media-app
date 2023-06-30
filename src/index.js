import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { makeServer } from "./server";
import { AuthenticationProvider } from "core/contexts/authentication-context/AuthenticationContext";
import { BrowserRouter } from "react-router-dom";
import { PostsProvider } from "core/contexts/posts-context/PostsContext";
import { UsersProvider } from "core/contexts/users-context/UsersContext";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationProvider>
        <UsersProvider>
          <PostsProvider>
            <App />
          </PostsProvider>
        </UsersProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
