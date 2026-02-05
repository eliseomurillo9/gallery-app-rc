import { LOCAL_STORAGE_KEYS } from "@/constants/storage";
import type { Photo, UserPhoto } from "@/types/Photo";
import { getStorageItem } from "./storageService";
import type { User } from "@/types/User";
import { ENV } from "@/config/env";

const BASE_URL = ENV.BASE_URL;
const convertToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.onerror = () => reject(new Error("Failed to read file"));
  });
};

export const getPhotos = async (userId: User["id"], signal?: AbortSignal): Promise<UserPhoto[]> => {
  const response = await fetch(`${BASE_URL}/user/${userId}/photo`, {signal});

  if (!response.ok) {
    console.error("Failed to fetch photos");
  }

  return await response.json();
};

export const getPhotoById = async (photoId: Photo["id"]): Promise<Photo> => {
  const response = await fetch(`${BASE_URL}/photo/${photoId}`);

  if (!response.ok) {
    throw new Error("Error fetching photo details");
  }

  const photos = await response.json();
  console.log("Fetched photo:", photos);
  return photos;
};

export const updateGallery = async (
  userId: User["id"],
  gallery: Photo[],
) => {
  const uploadPhotos = await fetch(`${BASE_URL}/user/${userId}/photo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gallery),
  });

  if (!uploadPhotos.ok) {
    console.error("Failed to upload photos");
  }

  console.info("Photos uploaded successfully");
  return await uploadPhotos.json();
};

//TODO; FIX ALL UPLOAD logic to store images in server
export async function uploadPhoto(
  id: User["id"],
  photosToUpload: File[],
): Promise<UserPhoto[]> {
  console.log("RUN RUN UPLOAD PHOTO");
  try {
    const user = getStorageItem(LOCAL_STORAGE_KEYS.LOGGED_USER);

    const imagesBuildData = Promise.all(
      photosToUpload.map(async (photoFile: File) => {
        const base64Data = await convertToBase64(photoFile);
        console.log("Base64 data:", base64Data);
        return {
          creationDate: new Date().toISOString(),
          url: base64Data,
        };
      }),
    );
    console.log("Images build data promises:", imagesBuildData);

    user.photos.push(...(await imagesBuildData));
    console.log("Updated photos:", user.photos);
    updateGallery(id, await imagesBuildData);

    return user.photos;
  } catch (error: unknown) {
    console.error("Error uploading photo:", error);
    return [];
  }
}
