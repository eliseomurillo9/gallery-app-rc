import { ImgElement } from "./components/imgElement/ImgElement";
import { Fragment } from "react/jsx-runtime";
import "./Gallery.css";
import { ImageModal } from "./components/imageModal/ImageModal";
import { useState } from "react";
import type {AlbumPhoto, Photo} from "@/types/Photo"

interface GalleryProps {
  photos: Photo[] | AlbumPhoto[];
  onPhotoDelete: (photoId: Photo['id']) => Promise<boolean>
}

export function Gallery({ photos, onPhotoDelete}: Readonly<GalleryProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoId, setPhotoId] = useState<number|null>(null);
  function handleClick(photoIdentifier?: Photo["id"]) {
    if (photoIdentifier && !isOpen) {
      setPhotoId(photoIdentifier);
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
    setPhotoId(null);
  }

  return (
    <div className="gallery">
      {photos  && photos.length !== 0 ? (
        photos.map((photo: Photo | AlbumPhoto) => {
          return (
            <Fragment key={photo.id}>
              {ImgElement({
                ImgSrc: photo.url,
                altText: "Image from user album",
                action: () => handleClick(photo.id),
              })}
            </Fragment>
          );
        })
      ) : (
        <pre>No photos</pre>
      )}
      {!!(photoId) && (
        <ImageModal isOpen={isOpen} toggleModal={() => handleClick()} photoId={photoId} onDelete={onPhotoDelete}  />
      )}
    </div>
  );
}
