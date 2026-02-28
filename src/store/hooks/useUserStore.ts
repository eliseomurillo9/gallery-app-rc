import {useSyncExternalStore} from "react";
import {galleryStore} from "@/store/gallery.ts";

export const useGalleryStore = () =>{
  return useSyncExternalStore(
    galleryStore.subscribe,
    () => galleryStore.getGallery()
  )};
