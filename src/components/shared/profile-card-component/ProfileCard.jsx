import { TbArrowBack } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { RxLink2 } from "react-icons/rx";
import { MdVerified } from "react-icons/md";
import { SlUserFollow } from "react-icons/sl";
import { useState } from "react";

import "./ProfileCard.css";
import Button from "../button-component/Button";
import { userProfileDetailsTabCategories } from "config/AppConfig";
import ProfileSpecificPosts from "./ProfileSpecificPosts";
import LikedPosts from "components/features/liked-posts/LikedPosts";
import { usePosts } from "core/contexts/posts-context/PostsContext";
import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";

const ProfileCard = ({ userDetails }) => {
  const navigate = useNavigate();
  const [isCategorySelected, setCategorySelected] = useState(
    userProfileDetailsTabCategories[0]
  );
  const { posts } = usePosts();
  const { user: currentUser } = useAuthentication();

  const postsCount = posts?.filter(
    (post) => userDetails?.username === post?.username
  ).length;

  const isSignedInUser = () => currentUser?.username === userDetails?.username;

  const isUserVerified = () =>
    isSignedInUser() || userDetails?.username === "gautam.bm";

  return (
    <div className="user-profile-section">
      <div className="profile-header">
        <Button
          label={<TbArrowBack size={24} />}
          clickHandlerFunction={navigate}
          params={-1}
          className={"back-btn"}
        />
        <div className="profile-user-info">
          <h3>{userDetails?.username}</h3>
          <span>
            {postsCount} {postsCount > 1 ? "tweets" : "tweet"}
          </span>
        </div>
      </div>

      <div className="profile-banner">
        <img src={userDetails?.bgUrl} alt="banner" />
      </div>

      <div className="profile-user-details">
        <img
          className="profile-user-avatar"
          src={userDetails?.picUrl}
          alt={userDetails?.username}
        />
        <div className="profile-user-info">
          <div className="profile-user-name">
            <h4>{`${userDetails?.firstName} ${userDetails?.lastName}`}</h4>
            {isUserVerified() && (
              <span>
                <MdVerified size={18} />
              </span>
            )}
          </div>
          <p>@{userDetails?.username}</p>
        </div>
      </div>

      <div className="profile-action-btns">
        {isSignedInUser() && (
          <>
            <Button
              label={
                <>
                  <span className="profile-action-btn-icon">
                    <FaUserEdit size={18} />
                  </span>
                  <span className="profile-action-btn-txt">Edit</span>
                </>
              }
            />
            <Button
              label={
                <>
                  <span className="profile-action-btn-icon">
                    <BiLogOut size={18} />
                  </span>
                  <span className="profile-action-btn-txt">Logout</span>
                </>
              }
            />
          </>
        )}
        {!isSignedInUser() && (
          <>
            <Button
              label={
                <>
                  <span className="profile-action-btn-icon">
                    <SlUserFollow size={18} />
                  </span>
                  <span className="profile-action-btn-txt">Follow</span>
                </>
              }
            />
          </>
        )}
      </div>

      <div className="profile-bio-details">
        <div className="user-bio">
          <p>{userDetails?.bio}</p>
        </div>
        <a
          href={userDetails?.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RxLink2 size={18} /> <span>{userDetails?.websiteName}</span>
        </a>
        <div className="follow-info-section">
          <div className="follow-info">
            <span>{userDetails?.following.length}</span>
            <p>Following</p>
          </div>
          <div className="follow-info">
            <span>{userDetails?.followers.length}</span>
            <p>Followers</p>
          </div>
        </div>
      </div>

      <div className="detail-tabs-section">
        <nav className="detail-tabs-navbar">
          <ul>
            {userProfileDetailsTabCategories.map((category) => (
              <li
                className={isCategorySelected === category ? "tab-active" : ""}
                key={category}
                onClick={() => setCategorySelected(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </nav>
        <hr className="separator" />
        <div className="details-tab-content">
          {isCategorySelected === userProfileDetailsTabCategories[0] && (
            <ProfileSpecificPosts username={userDetails?.username} />
          )}
          {isCategorySelected === userProfileDetailsTabCategories[1] && (
            <LikedPosts currentUser={userDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
