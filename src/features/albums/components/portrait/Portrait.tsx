import { Icon } from "../../../../shared/UI/Icon/Icon";
import "./portrait.css";
type Props = {
  imgHref?: string;
  name: string;
  totalPhotos?: number;
};
export function Portrait({ imgHref, name, totalPhotos }: Props) {
  return (
    <a href="#" className="portrait-view">
      <div className="portrait-view__img">
        {imgHref ? <img src={imgHref} alt={`Portrait of ${name} album`} className="portrait-view__figure-element" /> : <div className="portrait-view__figure-element"><Icon name="album" size="2xl" /></div>}
      </div>
      <div className="portrait-view__info">
        <h2>{name}</h2>
        <p>{totalPhotos} Photos</p>
      </div>
    </a>
  );
}
