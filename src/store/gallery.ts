import type { Photo } from "@/types/Photo";

class GaleryStore {
  private static instance: GaleryStore;
  private gallery: Photo[] = [];

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

  public setGallery(photos: Photo[]): void {
    this.gallery = photos;
  }
}

export const galleryStore = GaleryStore.getGalleryInstance();