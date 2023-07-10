/* eslint-disable */

import ProfileCard from "components/shared/profile-card-component/ProfileCard";
import "./UserProfile.css";
import { useUsers } from "core/contexts/users-context/UsersContext";

const UserProfile = ({ username }) => {
  const { users } = useUsers();

  const userDetails = users.find((user) => user.username === username);

  return (
    <div className="user-profile-container">
      <ProfileCard userDetails={userDetails} />
    </div>
  );
};

export default UserProfile;
