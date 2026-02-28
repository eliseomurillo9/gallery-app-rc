import {ENV} from "@/config/env";
import type {Album} from "@/types/Album";
import type {Photo} from "@/types/Photo";
import type {User} from "@/types/User.ts";
import type {Result} from "@services/types/Result.ts";

type AddPhotoToAlbumParams = {
  albumId: Album["id"];
  photo: {
    id: Photo["id"];
    url: Photo["url"];
  };
};

const BASE_URL = ENV.BASE_URL;

export const addPhotoToAlbum = async (params: AddPhotoToAlbumParams) => {
  const { albumId, photo } = params;

  const albumResponse = await fetch(`${BASE_URL}/albums/${albumId}`);

    if (!albumResponse.ok) {
    console.error("Failed to fetch album");
    }

    const album = await albumResponse.json() as Album;

    album.photos.push(photo);
  const uploadPhoto = await fetch(`${BASE_URL}/albums/${albumId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(album),
  });

  if (!uploadPhoto.ok) {
    console.error("Failed to add photo to album");
    return false;
  }
  console.info("Photo added to album successfully");
};

export const getUserAlbums = async (userId: User['id']): Promise<Album[]> => {
  const albums = await fetch(`${BASE_URL}/user/${userId}/albums`);

  if (!albums.ok) {
    console.error("Failed to fetch albums");
  }
  return await albums.json();
};

export const getAlbumById = async (albumId: Album["id"]): Promise<Album> => {
  const albumPhotos = await fetch(`${BASE_URL}/albums/${albumId}`);

  if (!albumPhotos.ok) {
    console.error("Failed to fetch album photos");
  }
  return await albumPhotos.json();
};

export const deletePhotoFromAlbum = async (userId: User['id'], album: Album, photoId: Photo['id']): Promise<Result<null>> => {
  const photoIndex = album.photos.findIndex(photo => photo.id === photoId);
  album.photos.splice(photoIndex, 1);

  const deletePhoto = await fetch(`${BASE_URL}/user/${userId}/albums/${album.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(album),
  });

  if (!deletePhoto.ok) {
    console.error("Failed to delete photo from album");
    return { success: false, data: null, error: "Failed to delete photo from album" };
  }
  return { success: true, data: null, error: null };
}
