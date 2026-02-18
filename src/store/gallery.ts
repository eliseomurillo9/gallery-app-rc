import type {Photo} from "@/types/Photo";
import {deleteUserPhoto, getGalleryByUserId} from "@services/galleryService.ts";
import type {User} from "@/types/User.ts";

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
    try {
      this.gallery = await getGalleryByUserId(userId);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }

  }

  public async deletePhoto(userId: User["id"], photoId: Photo["id"]) {
    const deletePhotoRequest = await deleteUserPhoto(userId, photoId);

    if (!deletePhotoRequest.success) {
      return false;
    }

    this.gallery = await getGalleryByUserId(userId)
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