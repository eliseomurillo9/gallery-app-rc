import "./ImgElement.css";
interface Props {
  ImgSrc: string;
  altText: string;
  action?: () => void;
}

export function ImgElement({ ImgSrc, altText, action }: Props) {
  console.log(ImgSrc);
  return (
    <div className="img-element" onClick={action}>
      <img
        src={ImgSrc}
        alt={altText}
        className="img-element--img"
      />
    </div>
  );
}
