/* eslint-disable */

import LikedPosts from "components/features/liked-posts/LikedPosts";
import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";

const LikedPostsPage = () => {
  const { user } = useAuthentication();
  return <LikedPosts currentUser={user} />;
};

export default LikedPostsPage;
