/* eslint-disable */

import { FaCamera, FaPencilAlt } from "react-icons/fa";
import "./EditProfile.css";
import Button from "components/shared/button-component/Button";
import { useState } from "react";
import InputField from "components/shared/input-field-component/InputField";
import OutsideClickHandler from "react-outside-click-handler";
import CustomModal from "components/shared/custom-modal-component/CustomModal";
import { userAvatarOptions } from "config/AppConfig";
import { useUsers } from "core/contexts/users-context/UsersContext";

const EditProfile = ({ userDetails, handleCloseEditModal }) => {
  const [editProfileDetails, setEditProfileDetails] = useState({
    bgUrl: userDetails?.bgUrl,
    picUrl: userDetails?.picUrl,
    websiteUrl: userDetails?.websiteUrl,
    bio: userDetails?.bio,
  });
  const [picChange, setPicChange] = useState({
    picUrl: null,
    bgUrl: null,
  });
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [showAvatarSection, setShowAvatarSection] = useState(false);

  const { editUser } = useUsers();

  const handleEditProfileFieldChangeHandler = (event) => {
    const { name, value } = event.target;
    setEditProfileDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicOrBgChange = (event) => {
    const { name } = event.target;
    const value = URL.createObjectURL(event.target.files[0]);
    setPicChange((prev) => ({ ...prev, [name]: value }));
    setEditProfileDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    handleCloseUploadModal();
  };

  const handleOpenUploadModal = () => {
    setUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setUploadModalOpen(false);
  };

  const handleSelectAvatar = (avatarUrl) => {
    setPicChange((prev) => ({ ...prev, picUrl: avatarUrl }));
    setEditProfileDetails((prev) => ({
      ...prev,
      picUrl: avatarUrl,
    }));
    handleCloseUploadModal();
  };

  const handleOutsideClick = () => {
    handleCloseUploadModal();
    setShowAvatarSection(false);
  };

  const saveEditUserDetails = () => {
    editUser({ ...userDetails, ...editProfileDetails });
    handleCloseEditModal();
  };

  return (
    <div className="edit-profile-section">
      <div className="edit-profile-banner">
        <img src={picChange.bgUrl ?? userDetails?.bgUrl} alt="banner" />
        <label htmlFor="profile-banner-input" className="edit-prof-banner-icon">
          <FaCamera size={18} />
        </label>
        <InputField
          id={"profile-banner-input"}
          type={"file"}
          accept={"image/*"}
          className={"hidden"}
          name={"bgUrl"}
          onChangeFunction={handleProfilePicOrBgChange}
        />
      </div>

      <div className="edit-profile-user-details">
        <img
          className="edit-profile-user-avatar"
          src={picChange.picUrl ?? userDetails?.picUrl}
          alt={userDetails?.username}
        />
        <label className="edit-prof-dp-icon" onClick={handleOpenUploadModal}>
          <FaPencilAlt size={18} />
        </label>
        {isUploadModalOpen && (
          <OutsideClickHandler onOutsideClick={handleOutsideClick}>
            <div className="prof-pic-config-menu">
              <label htmlFor="profile-pic-input">Upload</label>
              <InputField
                id={"profile-pic-input"}
                type={"file"}
                accept={"image/*"}
                className={"hidden"}
                name={"picUrl"}
                onChangeFunction={handleProfilePicOrBgChange}
              />
              <label onClick={() => setShowAvatarSection(true)}>
                Choose Avatar
              </label>
              {showAvatarSection && (
                <div className="avatars-container">
                  <CustomModal
                    isOpen={showAvatarSection}
                    onClose={() => setShowAvatarSection(false)}
                  >
                    <div className="avatars-section">
                      <h4>Choose from Avatars</h4>
                      <div className="avatar-selection-section">
                        {userAvatarOptions.map(({ id, src }, index) => (
                          <img
                            className="avatar-option"
                            key={id}
                            src={src}
                            alt={"avatar" + index}
                            onClick={() => handleSelectAvatar(src)}
                          />
                        ))}
                      </div>
                    </div>
                  </CustomModal>
                </div>
              )}
            </div>
          </OutsideClickHandler>
        )}
      </div>

      <div className="text-edit-section">
        <div className="text-edit-category">
          <label htmlFor="bio-input">Bio:</label>
          <textarea
            id="bio-input"
            value={editProfileDetails.bio}
            name="bio"
            maxLength={100}
            className="bio-input-section"
            onChange={handleEditProfileFieldChangeHandler}
            placeholder="About me..."
          />
        </div>
        <div className="text-edit-category">
          <label htmlFor="portfolio-url">Portfolio URL:</label>
          <InputField
            id={"portfolio-url"}
            type={"text"}
            value={editProfileDetails.websiteUrl}
            name={"websiteUrl"}
            onChangeFunction={handleEditProfileFieldChangeHandler}
            className={"portfolio-url-inpt"}
            placeholder={"https://www.google.com"}
          />
        </div>
      </div>

      <div className="edit-prof-action-btns">
        <Button
          label={"Cancel"}
          className={"edit-profile-action-default-btn cancel-btn"}
          clickHandlerFunction={handleCloseEditModal}
        />
        <Button
          label={"Save"}
          className={"edit-profile-action-default-btn"}
          clickHandlerFunction={saveEditUserDetails}
        />
      </div>
    </div>
  );
};

export default EditProfile;
