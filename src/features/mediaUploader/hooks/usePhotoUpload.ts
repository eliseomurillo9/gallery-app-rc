import { userStore } from "@/store/user";
import { uploadPhoto } from "@services/galleryService";
import { t } from "i18next";
import { useState } from "react";

const MAX_IMAGE_SIZE_MB = 2;

const isImageSizeValid = (file: File) => {
  const fileSizeMB = file.size / (1024 * 1024);
  return fileSizeMB > MAX_IMAGE_SIZE_MB;
};
export const usePhotoUpload = () => {
  const [imagesList, setImagesList] = useState<File[]>([]);
  const updatePicList = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      e.preventDefault();
      const imagesList: File[] = e.target.files
        ? Array.from(e.target.files)
        : [];
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      if (files.length > 10 || imagesList.length + files.length > 10) {
        alert(t("uploadView.alert"));
        return;
      }

      const validPhotos = files.filter(
        (file) => isImageSizeValid(file) === false,
      );
      if (validPhotos.length < files.length) {
        alert(t("uploadView.sizeAlert", { size: MAX_IMAGE_SIZE_MB }));
      }

      await uploadPhoto(userStore.getUser().id, validPhotos);

      setImagesList(validPhotos);
    } catch (error) {
      console.error("Error uploading photos:", error);
    }
  };

  function deleteImage(imageIndex: number) {
    setImagesList(imagesList.filter((_, index) => index !== imageIndex));
  }

  return { updatePicList, imagesList, deleteImage };
};
