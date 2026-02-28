import { Route } from "@routes/$userId/album/$albumId";
import {deletePhotoFromAlbum, getAlbumById} from "@services/albumService";
import { Button } from "@shared/UI/Button/Button";
import { Gallery } from "@shared/UI/Gallery/Gallery";
import "./gallery.css";

import { useEffect, useState } from "react";
import type { Album } from "@/types/Album";
import type {Photo} from "@/types/Photo.ts";
import {userStore} from "@/store/user.ts";

const user = userStore.getUser()
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


  const deletePhoto = async (photoId: Photo['id'])=> {
    if(!album) {
      console.error('Not album')
      return false;
    }
    const {success, error} = await deletePhotoFromAlbum(user.id, album, photoId);

    if (!success) {
      console.error("Are you sure you want to delete the image", error);
    }
    setAlbum(album);
    return success;
  }

  return (
    <div className="gallery-section--container">
      <div className="gallery-section--header">
        <Button icon="back" href={`/${userId}/profile/albums`} />
        <h2>{album?.title}</h2>
      </div>
      <Gallery photos={album?.photos ?? []} onPhotoDelete={deletePhoto} />
    </div>
  );
}
