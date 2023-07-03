import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";
import "./CreatePost.css";
import { FaPhotoVideo } from "react-icons/fa";
import { MdInsertEmoticon } from "react-icons/md";
import Button from "components/shared/button-component/Button";
import { AiOutlineGif } from "react-icons/ai";

const CreatePost = () => {
  const { user } = useAuthentication();

  return (
    <div className="create-post-grid">
      <img
        className="user-profile-pic"
        src={user?.picUrl}
        alt={user?.username}
      />
      <div className="create-post-container">
        <div className="create-post-contents">
          <div className="post-input-container">
            <textarea
              className="post-input-section"
              name="textContent"
              id="post-inpt-txt"
              placeholder="What's on your mind?!"
            />
          </div>
        </div>
        <div className="post-input-actions">
          <div className="post-input-features">
            <FaPhotoVideo
              className="add-media"
              size={20}
              title="Add Photo/Video"
            />
            <AiOutlineGif className="add-gif" size={24} title="Add GIF" />
            <MdInsertEmoticon
              className="add-emoji"
              size={20}
              title="Add Emoji"
            />
          </div>
          <Button label={"Tweet"} className={"post-btn"} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
