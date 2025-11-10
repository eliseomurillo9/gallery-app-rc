import { ImgElement } from "./components/imgElement/ImgElement";
import { Fragment } from "react/jsx-runtime";
import "./Gallery.css";
import { ImageModal } from "./components/imageModal/ImageModal";
import { useState } from "react";
import { userStore } from "../../store/user";
import type { Photo } from "@/types/Photo";

export function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState({id: 0});
  console.log('Runiiing')
  const photosStore = userStore.getUserPhotos()
  console.log(photosStore)
  function handleClick(open: boolean, photo?: Photo['id']) {
    console.log("Image clicked:", photo);
    setIsOpen(open);
    if (photo) {
      setImage(image);
      console.log(image)
    }
  }

  return (
    <div className="gallery">
      {photosStore ? photosStore.map((photo) => {
        return (
          <Fragment key={photo.id}>
            {ImgElement({
              ImgSrc: photo.url,
              altText: 'Image from user album',
              action: () => handleClick(true, photo.id),
            })}
          </Fragment>
        );
      }) : <pre>No photos</pre>}
      {image && <ImageModal isOpen={isOpen} toggleModal={setIsOpen} image={image.id} />}
    </div>
  );
}
