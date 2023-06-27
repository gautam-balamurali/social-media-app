import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "pages/login-page/LoginPage";
import SignupPage from "pages/signup-page/SignupPage";
import HomeFeedPage from "pages/home-feed-page/HomeFeedPage";
import ExploreFeedPage from "pages/explore-feed-page/ExploreFeedPage";
import { AuthGuard } from "core/auth-guard/AuthGuard";
import BookmarkedPostsPage from "pages/bookmarked-posts-page/BookmarkedPostsPage";

const AppRoutes = () => {
  const protectedRoutes = [
    {
      path: "/",
      component: HomeFeedPage,
    },
    {
      path: "/explore",
      component: ExploreFeedPage,
    },
    {
      path: "/bookmarks",
      component: BookmarkedPostsPage,
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
