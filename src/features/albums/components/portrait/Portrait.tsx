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
        <img src={imgHref} alt={`Portrait of ${name} album`} />
      </div>
      <div className="portrait-view__info">
        <h2>{name}</h2>
        <p>{totalPhotos} Photos</p>
      </div>
    </a>
  );
}
