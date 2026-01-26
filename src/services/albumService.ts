import { LOCAL_STORAGE_KEYS } from "@/constants/storage";
import type { Album } from "@/types/Album";
import type { Photo } from "@/types/Photo";
import { getStorageItem } from "./storageService";

type AddPhotoToAlbumParams = {
  albumId: Album["id"];
  photo: {
    id: Photo["id"];
    url: Photo["url"];
  };
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  const albumsData = await albums.json();
  return albumsData;
};

export const getAlbumById = (albumId: Album["id"]) => {
  try {
    const albums = getStorageItem(LOCAL_STORAGE_KEYS.ALBUMS);

    const album = albums.data.find((album: Album) => album.id === albumId);

    if (!album) {
      throw new Error("Album not found");
    }

    return album.photos;
  } catch (error: unknown) {
    console.error(error);
  }
  return [];
};
