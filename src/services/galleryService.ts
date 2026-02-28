import { LOCAL_STORAGE_KEYS } from "@/constants/storage";
import type { Photo} from "@/types/Photo";
import { getStorageItem } from "./storageService";
import type { User } from "@/types/User";
import { ENV } from "@/config/env";
import type {Result} from "@services/types/Result.ts";

const BASE_URL = ENV.BASE_URL;

const convertToBase64 = async (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.onerror = () => reject(new Error("Failed to read file"));
  });
};

export const getPhotos = async (userId: User["id"], signal?: AbortSignal): Promise<Result<Photo[]>> => {
 try {
   const response = await fetch(`${BASE_URL}/user/${userId}/photo`, {signal});

   if (!response.ok) {
     return { success: false, data: [], error: "Failed to fetch photos" };
   }

   return {success: true, data: await response.json(), error: null};
 } catch (error) {
    console.error("Error retrieving photo", error);
    return { success: false, data: [], error: "Unexpected error fetching photos" };
 }
};

export const getPhotoById = async (photoId: Photo["id"]): Promise<Result<Photo>> => {
  const response = await fetch(`${BASE_URL}/photo/${photoId}`);

  if (!response.ok) {
    return { success: false, data: null, error: "Failed to fetch photo" };
  }

  const photos = await response.json();
  return { success: true, data: photos, error: null };
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
): Promise<Photo[]> {
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
    await updateGallery(id, await imagesBuildData);

    return user.photos;
  } catch (error: unknown) {
    console.error("Error uploading photo:", error);
    return [];
  }
}

export const deleteUserPhoto = async (userId: User["id"], photoId: Photo["id"]): Promise<Result<Photo[]>> => {
  try {
    const response = await fetch(`${BASE_URL}/user/${userId}/photo/${photoId}`, {
      method: "DELETE",
    });

    const userResponse = await response.json();
    if (response.ok) {
      console.log("User deleted successfully", userResponse);
      return {success: true, data: userResponse.photos, error: null};
    }
    return {success: false, data: [], error: "Failed to delete photo"};
  } catch (error: unknown) {
    console.error("Error deleting photo:", error);
    return {success: false, data: [], error: "Error deleting photo"};
  }

}

// TODO: add pagination and {success: boolean, data: Photo[], error: string | null} structure to all gallery service methods
export const getGalleryByUserId = async (userId: User["id"]): Promise<Result<Photo[]>> => {

  try {
    const response = await fetch(`${BASE_URL}/user/${userId}/photo`);
    if (!response.ok) {
      return {success: false, data: [], error: "Failed to fetch gallery"};
    }

    return {success: true, data: await response.json(), error: null};
  } catch (error) {
    console.error("Error deleting photo:", error);
    return {success: false, data: [], error: "Unexpected error fetching photo"};
  }
}