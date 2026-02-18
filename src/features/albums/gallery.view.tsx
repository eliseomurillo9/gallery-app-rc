import { Route } from "@routes/$userId/album/$albumId";
import { getAlbumById } from "@services/albumService";
import { Button } from "@shared/UI/Button/Button";
import { Gallery } from "@shared/UI/Gallery/Gallery";
import "./gallery.css";

import { useEffect, useState } from "react";
import type { Album } from "@/types/Album";

export function AlbumGalleryView() {
  const [album, setAlbum] = useState<Album>();
  const { userId, albumId } = Route.useParams();
  useEffect(() => {
    const albumPhotos = async () => {
      const album = await getAlbumById(Number(albumId));
      setAlbum(album);
    };

    albumPhotos();
  }, [albumId]);
  return (
    <div className="gallery-section--container">
      <div className="gallery-section--header">
        <Button icon="back" href={`/${userId}/profile/albums`} />
        <h2>{album?.title}</h2>
      </div>
      <Gallery photos={album?.photos ?? []} />
    </div>
  );
}
