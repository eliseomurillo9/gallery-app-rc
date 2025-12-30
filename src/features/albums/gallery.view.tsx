import type { UserPhoto } from "@/types/Photo";
import { Route } from "@routes/$userId/album/$albumId";
import { getAlbumById } from "@services/albumService";
import { Button } from "@shared/UI/Button/Button";
import { Gallery } from "@shared/UI/gallery/Gallery";
import './gallery.css';

import { useEffect, useState } from "react";

export function AlbumGalleryView() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const { userId, albumId } = Route.useParams();
  useEffect(() => {
    setPhotos(getAlbumById(Number(albumId)));
  }, [albumId]);
  return (
    <div className="gallery-section--container">
      <div className="gallery-section--button">
        <Button icon="back" href={`/${userId}/profile/albums`} />
      </div>
      <Gallery photos={photos} />
    </div>
  );
}
