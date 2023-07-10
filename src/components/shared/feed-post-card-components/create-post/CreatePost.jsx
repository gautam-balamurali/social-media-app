/* eslint-disable */

import { AiOutlineGif } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaPhotoVideo } from "react-icons/fa";
import { MdCancel, MdInsertEmoticon } from "react-icons/md";
import { useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import GifPicker from "gif-picker-react";
import OutsideClickHandler from "react-outside-click-handler";

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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGIFPicker, setShowGIFPicker] = useState(false);

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
        selectedMedia?.type?.includes("image") &&
        selectedMedia?.size > maxSizeImage
      ) {
        alert("Image size should be less than equal to 10 MB");
        return;
      }
      if (
        selectedMedia?.type?.includes("video") &&
        selectedMedia?.size > maxSizeVideo
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

  const toggleEmojiModal = () => {
    setShowEmojiPicker(true);
  };

  const emojiClickHandler = (emojiObj) => {
    const emoji = emojiObj.native;
    setPostData((prev) => ({ ...prev, content: prev.content + emoji }));
    setShowEmojiPicker(false);
  };

  const handleEmojiPickerOutsideClick = () => {
    setShowEmojiPicker(false);
  };

  const toggleGIFModal = () => {
    setShowGIFPicker(true);
  };

  const gifClickHandler = (gifObj) => {
    const gif = gifObj.preview.url;
    setMedia(gif);
    setShowGIFPicker(false);
  };

  const handleGIFPickerOutsideClick = () => {
    setShowGIFPicker(false);
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
              value={postData.content}
              maxLength={300}
            />
            {media && (
              <div className="media-input-container">
                {media?.type?.includes("video") && (
                  <video
                    key={URL.createObjectURL(media)}
                    controls
                    autoPlay
                    loop
                    className="media-input-video-section"
                  >
                    <source
                      src={URL.createObjectURL(media)}
                      alt="preview"
                      type="video/mp4"
                    />
                  </video>
                )}
                {(media?.type?.includes("image") ||
                  (typeof media === "string" && media?.includes("gif"))) && (
                  <img
                    src={
                      typeof media === "string" && media?.includes("gif")
                        ? media
                        : URL.createObjectURL(media)
                    }
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
            <label className="add-media-label" htmlFor="file-input">
              <InputField
                id={"file-input"}
                type={"file"}
                accept={"image/*, video/*"}
                className={"hidden"}
                onChangeFunction={handlePostDataMedia}
              />
              <FaPhotoVideo
                className="add-media"
                size={20}
                title="Add Photo/Video"
              />
            </label>
            <label className="add-gif-label">
              <AiOutlineGif
                className="add-gif"
                size={24}
                title="Add GIF"
                onClick={toggleGIFModal}
              />
              {showGIFPicker && (
                <OutsideClickHandler
                  onOutsideClick={handleGIFPickerOutsideClick}
                >
                  <div className="gif-container">
                    <GifPicker
                      tenorApiKey={`${process.env.REACT_APP_TENOR_API_KEY}`}
                      onGifClick={gifClickHandler}
                      height="16rem"
                      width="15rem"
                      categoryHeight={75}
                    />
                  </div>
                </OutsideClickHandler>
              )}
            </label>
            <label className="add-emoji-label">
              <MdInsertEmoticon
                size={20}
                title="Add Emoji"
                onClick={toggleEmojiModal}
                className="add-emoji"
              />
              {showEmojiPicker && (
                <OutsideClickHandler
                  onOutsideClick={handleEmojiPickerOutsideClick}
                >
                  <div className="emoji-container">
                    <Picker
                      data={data}
                      emojiSize={20}
                      emojiButtonSize={28}
                      previewPosition="none"
                      onEmojiSelect={emojiClickHandler}
                    />
                  </div>
                </OutsideClickHandler>
              )}
            </label>
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
