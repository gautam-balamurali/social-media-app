import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "pages/login-page/LoginPage";
import SignupPage from "pages/signup-page/SignupPage";
import FollowingFeedPage from "pages/following-feed-page/FollowingFeedPage";
import ExploreFeedPage from "pages/explore-feed-page/ExploreFeedPage";
import { AuthGuard } from "core/auth-guard/AuthGuard";

const AppRoutes = () => {
  const protectedRoutes = [
    {
      path: "/",
      component: FollowingFeedPage,
    },
    {
      path: "/explore",
      component: ExploreFeedPage,
    },
  ];

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      {protectedRoutes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <AuthGuard>
              <Component />
            </AuthGuard>
          }
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
