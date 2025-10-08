import { ImgElement } from "./components/imgElement/ImgElement";
import img1 from "../../assets/img/20250705_153641.jpg";
import img2 from "../../assets/img/20250713_150246.jpg";
import img3 from "../../assets/img/20250718_172445.jpg";
import img4 from "../../assets/img/20250712_152450.jpg";
import { Fragment } from "react/jsx-runtime";
import "./Gallery.css";

const images = [
  { src: img1, alt: "Image 1" },
  { src: img2, alt: "Image 2" },
  { src: img3, alt: "Image 3" },
  { src: img4, alt: "Image 4" },
];

export function Gallery() {
  function handleClick(image: { src: string; alt: string }) {
    console.log("Image clicked:", image);
    return (
      <div>
        <dialog>
          <h1>COUCOU</h1>
          <img src={image.src} alt={image.alt} />
        </dialog>
      </div>
    );
  }
  return (
    <div className="gallery">
      {images.map((image, index) => {
        return (
          <Fragment key={index}>
            <dialog>
              <h1>COUCOU</h1>
              <img src={image.src} alt={image.alt} />
            </dialog>
            {ImgElement({
              ImgSrc: image.src,
              altText: image.alt,
              action: () => console.log(`Clicked on ${image.alt}`),
            })}
          </Fragment>
        );
      })}
    </div>
  );
}
