import { userStore } from "@/store/user";
import type { UserPhoto } from "@/types/Photo";
import { Gallery } from "@shared/UI/gallery/Gallery";
import { useEffect, useState } from "react";

export function GalleryView() {
  const [photos, setPhoto] = useState<UserPhoto[]>([]);
  useEffect(() => {
    const photos = userStore.getUserPhotos();
    setPhoto(photos ?? [])
  }, [setPhoto]);
   return photos && photos.length !== 0 && (
    <Gallery photos={photos} />
  )
}
