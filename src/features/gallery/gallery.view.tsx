import { Gallery } from "@shared/UI/Gallery/Gallery";
import { useGalleryStore } from "@/store/hooks/useUserStore.ts";

export function GalleryView() {
  const photos = useGalleryStore();
  if (!photos) return null; // or a loading UI

  return photos && photos.length !== 0 && <Gallery photos={photos} />;
}