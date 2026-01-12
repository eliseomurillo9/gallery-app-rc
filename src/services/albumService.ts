import { LOCAL_STORAGE_KEYS } from "@/constants/storage";
import type { Album } from "@/types/Album";
import type { Photo, UserPhoto } from "@/types/Photo";
import { getStorageItem, setStorageItem } from "./storageService";

type AddPhotoToAlbumParams = {
  albumId: Album["id"];
  photo: {
    id: Photo["id"];
    url: Photo["url"];
  };
};
export const addPhotoToAlbum = (params: AddPhotoToAlbumParams) => {
  const { albumId, photo } = params;
  try {
    const albumsJson = getStorageItem(LOCAL_STORAGE_KEYS.ALBUMS);
    const albums = JSON.parse(albumsJson);

    const albumIndex = albums.data.findIndex(
      (album: Album) => album.id === albumId
    );

    if (albumIndex === -1) {
      throw new Error("Album not found");
    }

    const isPhotoInAlbum = albums.data[albumIndex].photos.some(
      ({ id }: UserPhoto) => photo.id === id
    );

    if (isPhotoInAlbum) {
      throw new Error("Photo already in album");
    }
    albums.data[albumIndex].photos.push(photo);
    setStorageItem(LOCAL_STORAGE_KEYS.ALBUMS, albums);

    return albums.data[albumIndex];
  } catch (error: unknown) {
    console.error(error);
  }
};

export const getUserAlbums = () => {
  try {
    const albums = getStorageItem(LOCAL_STORAGE_KEYS.ALBUMS);
    return albums.data;
  } catch (error) {
    console.error(error);
  }
  return [];
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
