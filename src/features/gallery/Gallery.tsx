import { ImgElement } from "./components/imgElement/ImgElement";
import img1 from "../../assets/img/20250705_153641.jpg";
import img2 from "../../assets/img/20250713_150246.jpg";
import img3 from "../../assets/img/20250718_172445.jpg";
import img4 from "../../assets/img/20250712_152450.jpg";
import { Fragment } from "react/jsx-runtime";
import "./Gallery.css";
import { ImageModal } from "./components/imageModal/ImageModal";
import { useState } from "react";

const images = [
  { src: img1, alt: "Image 1" },
  { src: img2, alt: "Image 2" },
  { src: img3, alt: "Image 3" },
  { src: img4, alt: "Image 4" },
];

export function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState({ src: "", alt: "" });

  function handleClick(open: boolean, image?: { src: string; alt: string }) {
    console.log("Image clicked:", image, open);
    setIsOpen(open);
    if (image) {
      setImage(image);
    }
  }

  return (
    <div className="gallery">
      {images.map((image, index) => {
        return (
          <Fragment key={index}>
            {ImgElement({
              ImgSrc: image.src,
              altText: image.alt,
              action: () => handleClick(true, image),
            })}
          </Fragment>
        );
      })}
      {image.src !== "" && <ImageModal isOpen={isOpen} toggleModal={setIsOpen} image={image} />}
    </div>
  );
}
