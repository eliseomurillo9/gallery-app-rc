import { LOCAL_STORAGE_KEYS } from "@/constants/storage";
import type { Album } from "@/types/Album";
import type { Photo, UserPhoto } from "@/types/Photo";

type AddPhotoToAlbumParams = {
  albumId: Album["id"];
  photo: {
    id: Photo["id"];
    url: Photo["url"];
  };
};
export const addPhotoToAlbum = (params: AddPhotoToAlbumParams) => {
  const { albumId, photo } = params;
  const albumsJson = window.localStorage.getItem(LOCAL_STORAGE_KEYS.ALBUMS);

  if (!albumsJson) {
    throw Error("Albums not found in storage");
  }
  const albums = JSON.parse(albumsJson);

  const albumIndex = albums.data.findIndex(
    (album: Album) => album.id === albumId
  );

  if (albumIndex === -1) {
    throw Error("Album not found");
  }

  const isPhotoInAlbum = albums.data[albumIndex].photos.some(
    ({ id }: UserPhoto) => photo.id === id
  );

  if (isPhotoInAlbum) {
    throw Error("Photo already in album");
  }
  albums.data[albumIndex].photos.push(photo);
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.ALBUMS,
    JSON.stringify(albums)
  );

  return albums.data[albumIndex];
};

export const getUserAlbums = () => {
  const albumsJson = window.localStorage.getItem(LOCAL_STORAGE_KEYS.ALBUMS);

  if (!albumsJson) {
    throw Error("Albums not found in storage");
  }
  const albums = JSON.parse(albumsJson);
  return albums.data
}

export const getAlbumById = (albumId: Album["id"]) => {
  const albumsJson = window.localStorage.getItem(LOCAL_STORAGE_KEYS.ALBUMS);

  if (!albumsJson) {
    throw Error("Albums not found in storage");
  }
  const albums = JSON.parse(albumsJson);

  const album = albums.data.find(
    (album: Album) => album.id === albumId
  );

  if (!album) {
    throw Error("Album not found");
  }

  return album.photos;
}