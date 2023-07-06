import { AiOutlineGif } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaPhotoVideo } from "react-icons/fa";
import { MdInsertEmoticon } from "react-icons/md";
import { useState } from "react";

import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";
import Button from "components/shared/button-component/Button";
import "./CreatePost.css";
import { usePosts } from "core/contexts/posts-context/PostsContext";

const CreatePost = () => {
  const { user } = useAuthentication();
  const { createNewPost } = usePosts();

  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    content: "",
    mediaUrl: "",
  });

  const isPostDataEmpty = () =>
    postData.content.length < 1 && postData.mediaUrl.length < 1;

  const handlePostDataContent = (event) => {
    const { value } = event.target;
    setPostData((prev) => ({ ...prev, content: value }));
  };

  const createPostButtonClickHandler = () => {
    createNewPost(postData);
    setPostData((prev) => ({ ...prev, content: "", mediaUrl: "" }));
  };

  return (
    <div className="create-post-grid">
      <img
        className="user-profile-pic cursor-pointer"
        src={user?.picUrl}
        alt={user?.username}
        onClick={() => navigate(`/profile/${user?.username}`)}
      />
      <div className="create-post-container">
        <div className="create-post-contents">
          <div className="post-input-container">
            <textarea
              className="post-input-section"
              name="textContent"
              id="post-inpt-txt"
              placeholder="What's on your mind?!"
              onChange={handlePostDataContent}
            />
          </div>
        </div>
        <div className="post-input-actions">
          <div className="post-input-features">
            <label className="add-media" htmlFor="file-input">
              <input
                id="file-input"
                type="file"
                accept="image/*, video/*"
                className="hidden"
              />
              <FaPhotoVideo size={20} title="Add Photo/Video" />
            </label>
            <AiOutlineGif className="add-gif" size={24} title="Add GIF" />
            <MdInsertEmoticon
              className="add-emoji"
              size={20}
              title="Add Emoji"
            />
          </div>
          <Button
            disabled={isPostDataEmpty()}
            label={"Tweet"}
            className={"post-btn"}
            clickHandlerFunction={createPostButtonClickHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
