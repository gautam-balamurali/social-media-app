/* eslint-disable */

import { useParams } from "react-router-dom";

import UserProfile from "components/features/user-profile/UserProfile";

const UserProfilePage = () => {
  const { username } = useParams();

  return <UserProfile username={username} />;
};

export default UserProfilePage;
