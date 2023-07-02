import {
  BsBookmark,
  BsBookmarkFill,
  BsDot,
  BsHeart,
  BsHeartFill,
  BsShare,
  BsThreeDots,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaEdit, FaRegCommentAlt, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import { formatDate } from "utils/date-formatter/dateFormat";
import "./FeedPostCard.css";
import Button from "../button-component/Button";
import { usePosts } from "core/contexts/posts-context/PostsContext";
import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";
import { useUsers } from "core/contexts/users-context/UsersContext";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";

const FeedPostCard = ({ post }) => {
  const { _id, content, likes, username, updatedAt, comments } = post;

  const [showPostConfigMenu, setShowPostConfigMenu] = useState(false);

  const {
    bookmarks,
    addPostToBookmarks,
    removePostFromBookmarks,
    likePost,
    dislikePost,
  } = usePosts();

  const { user: currentUser } = useAuthentication();

  const { users, followUser, unfollowUser } = useUsers();

  const postOwner = users?.find((user) => user.username === username);

  const isBookmarked = (postId) => bookmarks.includes(postId);
  const isLiked = () =>
    likes.likedBy.find(
      (likedByUser) => likedByUser.username === currentUser.username
    );

  const addLineBreaks = (text) => {
    const sentences = text.split(".");
    const lastIndex = sentences.length - 1;

    return sentences.map((sentence, index) => (
      <span key={index}>
        {sentence.trim()}
        {index !== lastIndex && (
          <span>
            .<br />
          </span>
        )}
      </span>
    ));
  };

  const handlePostConfigMenuClick = () => {
    setShowPostConfigMenu((prev) => !prev);
  };

  const handleOutsideClick = (event) => {
    const isClickWithinThreeDots = event.target.closest(".post-configs");
    if (!isClickWithinThreeDots) {
      setShowPostConfigMenu(false);
    }
  };

  const isSignedInUserFollowingThisUser = () =>
    currentUser?.following.find((user) => username === user?.username);

  const isSignedInUser = () => currentUser?.username === username;

  useEffect(() => {
    setShowPostConfigMenu(false);
  }, [post, postOwner]);

  return (
    <div className="post-container">
      <div className="post-section">
        <div className="post-top-section">
          <div className="user-details">
            <img
              className="user-avatar"
              src={postOwner.picUrl}
              alt={username}
            />
            <div className="post-basic-info">
              <p className="user-info">
                posted by <span>@{username}</span>
              </p>
              <span>
                <BsDot className="ms-view" size={18} />
              </span>
              <span>{formatDate(updatedAt)}</span>
            </div>
          </div>
          <div className="post-configs">
            <BsThreeDotsVertical
              onClick={handlePostConfigMenuClick}
              className="ss-view cursor-pointer"
            />
            <BsThreeDots
              onClick={handlePostConfigMenuClick}
              className="ms-view cursor-pointer"
            />
            {showPostConfigMenu && (
              <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                <div className="config-menu action-btns">
                  {isSignedInUser() && (
                    <>
                      <Button
                        label={
                          <>
                            <span className="btn-icon">
                              <FaEdit size={18} />
                            </span>
                            <span className="icon-count">Edit</span>
                          </>
                        }
                      />
                      <Button
                        label={
                          <>
                            <span className="btn-icon">
                              <FaTrash size={18} />
                            </span>
                            <span className="icon-count">Delete</span>
                          </>
                        }
                      />
                    </>
                  )}
                  {!isSignedInUser() && (
                    <>
                      {isSignedInUserFollowingThisUser() && (
                        <Button
                          label={
                            <>
                              <span className="btn-icon">
                                <SlUserUnfollow size={18} />
                              </span>
                              <span className="icon-count">Unfollow</span>
                            </>
                          }
                          clickHandlerFunction={unfollowUser}
                          params={postOwner?._id}
                        />
                      )}
                      {!isSignedInUserFollowingThisUser() && (
                        <Button
                          label={
                            <>
                              <span className="btn-icon">
                                <SlUserFollow size={18} />
                              </span>
                              <span className="icon-count">Follow</span>
                            </>
                          }
                          clickHandlerFunction={followUser}
                          params={postOwner?._id}
                        />
                      )}
                    </>
                  )}
                </div>
              </OutsideClickHandler>
            )}
          </div>
        </div>
        <p className="post-desc">{addLineBreaks(content)}</p>
        <hr className="separator" />
        <div className="action-btns">
          <div className="action-btns-post">
            <Button
              label={
                <>
                  <span className="btn-icon">
                    {isLiked() ? (
                      <BsHeartFill size={18} />
                    ) : (
                      <BsHeart size={18} />
                    )}
                  </span>
                  <span className="icon-count">{likes?.likeCount}</span>
                </>
              }
              clickHandlerFunction={isLiked() ? dislikePost : likePost}
              params={_id}
            />
            <Button
              label={
                <>
                  <span className="btn-icon">
                    <FaRegCommentAlt size={18} />
                  </span>
                  <span className="icon-count">{comments.length}</span>
                </>
              }
            />
            <Button
              label={
                <>
                  {isBookmarked(_id) ? (
                    <BsBookmarkFill size={18} />
                  ) : (
                    <BsBookmark size={18} />
                  )}
                </>
              }
              clickHandlerFunction={
                isBookmarked(_id) ? removePostFromBookmarks : addPostToBookmarks
              }
              params={_id}
            />
          </div>
          <Button
            label={
              <>
                <BsShare size={18} />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FeedPostCard;
