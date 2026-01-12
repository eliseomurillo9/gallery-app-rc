import { userStore } from "@/store/user";
import type { UserPhoto } from "@/types/Photo";
import { Gallery } from "@shared/UI/Gallery/Gallery";
import { useEffect, useState } from "react";

export function GalleryView() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  useEffect(() => {
    const photos = userStore.getUserPhotos();
    setPhotos(photos ?? [])
  }, [setPhotos]);
   return photos && photos.length !== 0 && (
    <Gallery photos={photos} />
  )
}
