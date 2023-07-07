import { AiOutlineGif } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaPhotoVideo } from "react-icons/fa";
import { MdCancel, MdInsertEmoticon } from "react-icons/md";
import { useRef, useState } from "react";

import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";
import Button from "components/shared/button-component/Button";
import { usePosts } from "core/contexts/posts-context/PostsContext";
import InputField from "components/shared/input-field-component/InputField";
import { handleMediaUpload } from "utils/handle-media-upload/handleMediaUpload";
import "./CreatePost.css";

const CreatePost = () => {
  const { user } = useAuthentication();
  const { createNewPost } = usePosts();

  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    content: "",
    mediaUrl: "",
  });
  const [media, setMedia] = useState(null);
  const createPostTextRef = useRef();

  const isPostDataEmpty = () => postData?.content?.length < 1 && media === null;

  const handlePostDataContent = (event) => {
    const { value } = event.target;
    setPostData((prev) => ({ ...prev, content: value }));
  };

  const handlePostDataMedia = (event) => {
    const selectedMedia = event.target.files[0];

    // Reset the file input value to allow selecting the same file again
    event.target.value = null;

    // Check if a media file is selected
    if (selectedMedia) {
      // Check the file size based on the type
      const maxSizeImage = 10 * 1024 * 1024; // 10MB
      const maxSizeVideo = 100 * 1024 * 1024; // 100MB

      if (
        selectedMedia.type.includes("image") &&
        selectedMedia.size > maxSizeImage
      ) {
        alert("Image size should be less than equal to 10 MB");
        return;
      }
      if (
        selectedMedia.type.includes("video") &&
        selectedMedia.size > maxSizeVideo
      ) {
        alert("Video size should be less than equal to 100 MB");
        return;
      }
      setMedia(selectedMedia);
    }
  };

  const deleteSelectedMedia = () => {
    setMedia(null);
  };

  const createPostButtonClickHandler = async () => {
    if (media) {
      const mediaUploadResponse = await handleMediaUpload(media);
      setMedia(null);
      createNewPost({ ...postData, mediaUrl: mediaUploadResponse.url });
    } else createNewPost(postData);
    setPostData((prev) => ({ ...prev, content: "", mediaUrl: "" }));
    createPostTextRef.current.value = "";
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
              ref={createPostTextRef}
            />
            {media && (
              <div className="media-input-container">
                {media?.type?.includes("video") && (
                  <video
                    key={URL.createObjectURL(media)}
                    controls
                    autoPlay
                    loop
                    className="media-input-section"
                  >
                    <source
                      src={URL.createObjectURL(media)}
                      alt="preview"
                      type="video/mp4"
                    />
                  </video>
                )}
                {media?.type?.includes("image") && (
                  <img
                    src={URL.createObjectURL(media)}
                    alt="preview"
                    className="media-input-section"
                  />
                )}
                <div onClick={deleteSelectedMedia} className="close-btn">
                  <span className="close-btn-icon">
                    <MdCancel size={24} />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="post-input-actions">
          <div className="post-input-features">
            <label className="add-media" htmlFor="file-input">
              <InputField
                id={"file-input"}
                type={"file"}
                accept={"image/*, video/*"}
                className={"hidden"}
                onChangeFunction={handlePostDataMedia}
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
