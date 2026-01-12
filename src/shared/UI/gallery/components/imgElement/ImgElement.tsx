import "./ImgElement.css";
interface Props {
  ImgSrc: string;
  altText: string;
  action: () => void;
}

export function ImgElement({ ImgSrc, altText, action }: Readonly<Props>) {

  return (
    <button
      type="button"
      className="img-element"
      onClick={action}
      aria-label={`View ${altText} in fullscreen`}
    >
      <img
        src={ImgSrc}
        alt={`View ${altText} in fullscreen`}
        className="img-element--img"
      />
    </button>
  );
}
