import type { UserPhoto } from "@/types/Photo";
import { getPhotos } from "@services/galleryService";
import { Gallery } from "@shared/UI/Gallery/Gallery";
import { useEffect, useState } from "react";

export function GalleryView() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  useEffect(() => {
    const getUserPhotos = async () => {
      const userPhotos = await getPhotos();
      setPhotos(userPhotos);
    };

    getUserPhotos();
  }, [setPhotos]);
  return photos && photos.length !== 0 && <Gallery photos={photos} />;
}
