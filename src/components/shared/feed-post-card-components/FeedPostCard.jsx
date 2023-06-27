import {
  BsBookmark,
  BsBookmarkFill,
  BsDot,
  BsHeart,
  BsShare,
  BsThreeDots,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaEdit, FaRegCommentAlt, FaTrash } from "react-icons/fa";
import { useState } from "react";

import { formatDate } from "utils/date-formatter/dateFormat";
import "./FeedPostCard.css";
import OutsideClickHandler from "react-outside-click-handler";
import Button from "../button-component/Button";

const FeedPostCard = ({ post }) => {
  const { _id, content, likes, username, updatedAt, comments, isBookmarked } =
    post;

  const [showPostConfigMenu, setShowPostConfigMenu] = useState(false);

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
                  <BsHeart size={18} />
                </span>
                <span className="icon-count">{likes?.likeCount}</span>
              </>
            }
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
                {isBookmarked ? (
                  <BsBookmarkFill size={18} />
                ) : (
                  <BsBookmark size={18} />
                )}
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FeedPostCard;
