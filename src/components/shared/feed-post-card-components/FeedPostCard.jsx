import {
  BsBookmark,
  BsBookmarkFill,
  BsDot,
  BsHeart,
  BsShare,
} from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";

import { formatDate } from "utils/date-formatter/dateFormat";
import "./FeedPostCard.css";

const FeedPostCard = ({ post }) => {
  const { _id, content, likes, username, updatedAt, comments, isBookmarked } =
    post;

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

  return (
    <div className="post-container">
      <div className="post-section">
        <div className="user-details">
          <img
            className="user-avatar"
            src={"http://bit.ly/42Zm7tM"}
            alt={username}
          />
          <p className="user-info">
            Posted by <span>@{username}</span>
          </p>
          <BsDot size={18} />
          <p>{formatDate(updatedAt)}</p>
        </div>
        <p className="post-desc">{addLineBreaks(content)}</p>
        <hr className="separator" />
        <div className="action-btns">
          <button>
            <span className="btn-icon">
              <BsHeart size={18} />
            </span>
            <span className="icon-count">{likes?.likeCount}</span>
          </button>
          <button>
            <span className="btn-icon">
              <FaRegCommentAlt size={18} />
            </span>
            <span className="icon-count">{comments.length}</span>
          </button>
          <button>
            <BsShare size={18} />
          </button>
          <button>
            {isBookmarked ? (
              <BsBookmarkFill size={18} />
            ) : (
              <BsBookmark size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedPostCard;
