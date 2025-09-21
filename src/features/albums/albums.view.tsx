import img1 from "../../assets/img/20250705_153641.jpg";
import img2 from "../../assets/img/20250713_150246.jpg";
import img3 from "../../assets/img/20250718_172445.jpg";
import img4 from "../../assets/img/20250712_152450.jpg";
import "./album.css";
import { Portrait } from "./components/portrait/Portrait";
export function albumsView() {
  return (
    <div className="album-view">
      <Portrait imgHref={img1} name="Vacation" totalPhotos={120} />
      <Portrait imgHref={img2} name="Family" totalPhotos={95} />
      <Portrait imgHref={img3} name="Friends" totalPhotos={80} />
      <Portrait imgHref={img4} name="Work" totalPhotos={60} />
      <Portrait imgHref={img1} name="Vacation" totalPhotos={120} />
      <Portrait imgHref={img2} name="Family" totalPhotos={95} />
      <Portrait imgHref={img3} name="Friends" totalPhotos={80} />
      <Portrait imgHref={img4} name="Work" totalPhotos={60} />
      <Portrait imgHref={img1} name="Vacation" totalPhotos={120} />
      <Portrait imgHref={img2} name="Family" totalPhotos={95} />
      <Portrait imgHref={img3} name="Friends" totalPhotos={80} />
      <Portrait imgHref={img4} name="Work" totalPhotos={60} />
    </div>
  );
}
