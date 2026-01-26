import { useTranslation } from "react-i18next";
import { Icon } from "../../../../shared/UI/Icon/Icon";
import "./portrait.css";
import { Link } from "@tanstack/react-router";
import { userStore } from "@/store/user";
type Props = {
  imgHref?: string;
  name: string;
  totalPhotos?: number;
  albumId: number;
};
export function Portrait({
  imgHref,
  name,
  totalPhotos,
  albumId,
}: Readonly<Props>) {
  const { t } = useTranslation();
  const user = userStore.getUser();
  return (
    <Link
      to="/$userId/album/$albumId"
      params={{ userId: String(user.id), albumId: String(albumId) }}
      className="portrait-view"
    >
      <div className="portrait-view__img">
        {imgHref && imgHref !== ""? (
          <img
            src={imgHref}
            alt={`Portrait of ${name} album`}
            className="portrait-view__figure-element"
          />
        ) : (
          <div className="portrait-view__figure-element">
            <Icon name="album" size="2xl" />
          </div>
        )}
      </div>
      <div className="portrait-view__info">
        <h2>{name}</h2>
        <p>
          {totalPhotos} {t("albums.portrait.key", { count: totalPhotos })}
        </p>
      </div>
    </Link>
  );
}
