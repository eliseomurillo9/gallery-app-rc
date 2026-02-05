import { userStore } from "@/store/user";
import type { UserPhoto } from "@/types/Photo";
import { getPhotos } from "@services/galleryService";
import { Gallery } from "@shared/UI/Gallery/Gallery";
import { useEffect, useState} from "react";

export function GalleryView() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  //const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const getUserPhotos = async () => {
      const userId = Number(userStore.getUser().id);
      return await getPhotos(userId, controller.signal);
    };

    getUserPhotos().then(userPhotos => {
      setPhotos(userPhotos);
    });

    return () => controller.abort();
  }, []);

  //if(isLoading) return null
  // TODO: Check why gallery is called twice.
  return photos && photos.length !== 0 && <Gallery caller="MAIN GALLERY" photos={photos} />;
}
