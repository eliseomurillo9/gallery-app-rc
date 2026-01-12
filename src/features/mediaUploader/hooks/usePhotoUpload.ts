import { t } from "i18next";
import { useState } from "react";

const MAX_IMAGE_SIZE_MB = 2;

const convertToBase64 = async (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = () => reject(new Error("Failed to read file"));
  });
};

const isImageSizeValid = (file: File["size"]) => {
  const fileSizeMB = file / (1024 * 1024);
  return fileSizeMB > MAX_IMAGE_SIZE_MB;
};
export const usePhotoUpload = (imagesList: File[]) => {

  const updatePicList = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (files.length > 10 || imagesList.length + files.length > 10) {
      alert(t("uploadView.alert"));
      return;
    }

    const validPhotos = files.filter(file => file.size < MAX_IMAGE_SIZE_MB * 1024 * 1024);
    if (validPhotos.length < files.length) {
      alert(t("uploadView.sizeAlert", { size: MAX_IMAGE_SIZE_MB }));
    }

    
    setImagesList((prev) => [...prev, ...files]);
  };
};
