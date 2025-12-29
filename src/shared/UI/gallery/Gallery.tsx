import { ImgElement } from "./components/imgElement/ImgElement";
import { Fragment } from "react/jsx-runtime";
import "./Gallery.css";
import { ImageModal } from "./components/imageModal/ImageModal";
import { useState } from "react";
import type { Photo, UserPhoto } from "@/types/Photo"

interface GalleryProps {
  photos: UserPhoto[];
}

export function Gallery({ photos }: GalleryProps) {
  console.log(photos)
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState({ id: 0 });
  function handleClick(open: boolean, photo?: Photo["id"]) {
    if (photo) {
      setImage({ id: photo });
      setIsOpen(open);
      return;
    }

    setIsOpen(false);
  }

  return (
    <div className="gallery">
      {photos  && photos.length !== 0 ? (
        photos.map((photo: UserPhoto) => {
          return (
            <Fragment key={photo.id}>
              {ImgElement({
                ImgSrc: photo.url,
                altText: "Image from user album",
                action: () => handleClick(true, photo.id),
              })}
            </Fragment>
          );
        })
      ) : (
        <pre>No photos</pre>
      )}
      {image.id && (
        <ImageModal isOpen={isOpen} toggleModal={setIsOpen} image={image.id} />
      )}
    </div>
  );
}
