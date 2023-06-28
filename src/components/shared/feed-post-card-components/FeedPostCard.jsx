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
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import { formatDate } from "utils/date-formatter/dateFormat";
import "./FeedPostCard.css";
import Button from "../button-component/Button";
import { usePosts } from "core/contexts/posts-context/PostsContext";
import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";

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

  return (
    <div className="post-container">
      <div className="post-section">
        <div className="post-top-section">
          <div className="user-details">
            <img
              className="user-avatar"
              src={"http://bit.ly/42Zm7tM"}
              alt={username}
            />
            {/* Make post-basic-view flex row in ms-view and make ms-view inline-block */}
            <div className="post-basic-info">
              <p className="user-info">
                Posted by <span>@{username}</span>
              </p>
              <BsDot className="ms-view" size={18} />
              <p>{formatDate(updatedAt)}</p>
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
                </div>
              </OutsideClickHandler>
            )}
          </div>
        </div>
        <p className="post-desc">{addLineBreaks(content)}</p>
        <hr className="separator" />
        <div className="action-btns">
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
                <BsShare size={18} />
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
      </div>
    </div>
  );
};

export default FeedPostCard;
