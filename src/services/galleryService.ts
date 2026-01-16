import { LOCAL_STORAGE_KEYS } from "@/constants/storage";
import type { Photo, UserPhoto } from "@/types/Photo";
import { getStorageItem, setStorageItem } from "./storageService";

const convertToBase64 = async (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = () => reject(new Error("Failed to read file"));
  });
};

export const getPhotoById = async (photoId: Photo["id"]): Promise<Photo> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/photo/${photoId}`
  );

  if (!response.ok) {
    throw new Error("Error fetching photo details");
  }

  const photos = await response.json();
  console.log("Fetched photo:", photos);
  return photos;
};

export function updateGallery(gallery: UserPhoto[] | Photo[]) {
  try {
    const user = getStorageItem(LOCAL_STORAGE_KEYS.LOGGED_USER);

    user.photos = gallery;

    localStorage.setItem(LOCAL_STORAGE_KEYS.LOGGED_USER, JSON.stringify(user));
  } catch (error: unknown) {
    console.error("Error updating gallery:", error);
  }
}

export async function uploadPhoto(
  photosToUpload: File[]
): Promise<UserPhoto[]> {
  console.log("RUN RUN UPLOAD PHOTO");
  try {
    const user = getStorageItem(LOCAL_STORAGE_KEYS.LOGGED_USER);
    const photos = getStorageItem(LOCAL_STORAGE_KEYS.PHOTOS);
    const imagesBuildData = Promise.all(
      photosToUpload.map(async (photoFile: File) => {
        const base64Data = await convertToBase64(photoFile);
        console.log("Base64 data:", base64Data);
        return {
          id: crypto.randomUUID(),
          creationDate: new Date().toISOString(),
          url: base64Data,
        };
      })
    );
    console.log("Images build data promises:", imagesBuildData);

    user.photos.push(...(await imagesBuildData));
    photos.data.push(...(await imagesBuildData));
    console.log("Updated photos:", photos);
    updateGallery(user.photos);
    setStorageItem(LOCAL_STORAGE_KEYS.PHOTOS, photos);
    return user.photos;
  } catch (error: unknown) {
    console.error("Error uploading photo:", error);
    return [];
  }
}
