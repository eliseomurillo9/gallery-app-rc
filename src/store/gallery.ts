import type {Photo} from "@/types/Photo";
import {deleteUserPhoto, getGalleryByUserId} from "@services/galleryService.ts";
import type {User} from "@/types/User.ts";
import {deletePhotoFromAlbum, getUserAlbums} from "@services/albumService.ts";

class GaleryStore {
  private static instance: GaleryStore;
  private gallery: Photo[] = [];
  private readonly listeners: Set<() => void> = new Set();


  private constructor() {}

  public static getGalleryInstance() {
    if (!GaleryStore.instance) {
      this.instance = new GaleryStore();
    }
    return this.instance;
  }

  public getGallery(): Photo[] {
    return this.gallery;
  }

  public async fetchGallery(userId: User['id']): Promise<void> {
      const {success, data, error} = await getGalleryByUserId(userId);
      if (!success) {
            console.error('Failed to fetch gallery:', error);
      }
      this.gallery = data ?? [];

  }

  public async deletePhoto(userId: User["id"], photoId: Photo["id"]) {
    const deletePhotoRequest = await deleteUserPhoto(userId, photoId);

    if (!deletePhotoRequest.success) {
      return false;
    }

    const {success, data, error} = await getUserAlbums(userId);

    if (!success) {
        console.error('Failed to fetch gallery after deletion', error);
        return false;
    }

    const matchedAlbums = (data ?? []).filter(album => album.photos.some(photo => photo.id === photoId));

    const deletePhotoPromises = matchedAlbums.map(async (album) => {
      const response = await deletePhotoFromAlbum(userId, album, photoId);
        if (!response.success) {
            console.error('Failed to delete photo from album:', response.error);
        }

        return {albumId: album.id, response};
    })


    await Promise.all(deletePhotoPromises).then(result => {
      const failDelete = result.filter(({ response }) => !response.success)
      failDelete.forEach(({albumId, response}) => {console.error(`error deleting photo from album ${albumId}`, response.error)});
    });

    const updatedGallery =  await getGalleryByUserId(userId)
    this.gallery = updatedGallery.data ?? [];
    this.notify();
    return true;
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
}

export const galleryStore = GaleryStore.getGalleryInstance();