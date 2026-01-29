import { userStore } from "@/store/user";
import type { UserPhoto } from "@/types/Photo";
import { getPhotos } from "@services/galleryService";
import { Gallery } from "@shared/UI/Gallery/Gallery";
import { useEffect, useState } from "react";

export function GalleryView() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  useEffect(() => {
    const getUserPhotos = async () => {
      console.log(userStore.getUser())
      const userPhotos = await getPhotos(1);
      setPhotos(userPhotos);
    };

    getUserPhotos();
  }, []);
  return photos && photos.length !== 0 && <Gallery photos={photos} />;
}
