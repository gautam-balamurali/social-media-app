import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from "config/AppConfig";

export const handleMediaUpload = (media) => {
  const formData = new FormData();

  formData.append("file", media);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "twitlyx");

  return fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.error(err));
};
