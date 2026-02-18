import {ENV} from "@/config/env";
import type {Album} from "@/types/Album";
import type {Photo} from "@/types/Photo";

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
  const uploadPhoto = await fetch(`${BASE_URL}/albums/${albumId}/photos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(photo),
  });

  if (!uploadPhoto.ok) {
    console.error("Failed to add photo to album");
    return false;
  }
  console.info("Photo added to album successfully");
};

export const getUserAlbums = async () => {
  const albums = await fetch(`${BASE_URL}/albums`);

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
