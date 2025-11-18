import { LOCAL_STORAGE_KEYS } from "@/constants/storage";
import type { Photo } from "@/types/Photo";

export function getPhotoById(photoId: Photo["id"]): Photo {
  console.log('Fetching photo with ID:', photoId);
  const photosJson = window.localStorage.getItem(LOCAL_STORAGE_KEYS.PHOTOS);
  console.log('Photos JSON from localStorage:', photosJson);
  if (!photosJson) {
     throw Error('Images not found in storage')
  }
  const photos = JSON.parse(photosJson);

  const photo = photos.data.find((photo: Photo) => photoId === photo.id)
  console.log('Found photo:', photo);

  if (!photo) {
    throw Error('Error fetching photo details')
  }

  return photo
}