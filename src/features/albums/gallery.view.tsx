import type { UserPhoto } from "@/types/Photo";
import { Route } from "@routes/$userId/album/$albumId";
import { getAlbumById } from "@services/albumService";
import { Gallery } from "@shared/UI/gallery/Gallery";

import { useEffect, useState } from "react";

export function AlbumGalleryView() {
  const [photos, setPhoto] = useState<UserPhoto[]>([])
  const { albumId } = Route.useParams()
  useEffect(() => {
    setPhoto(getAlbumById(Number(albumId)));
  }, [albumId])
  return (
    <Gallery photos={photos}/>
  )
}