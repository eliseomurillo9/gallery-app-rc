import { Link } from "@tanstack/react-router";
import { Icon } from "../../Icon/Icon";
import "./NavbarMobile.css";
import { useTranslation } from "react-i18next";
import { userStore } from "@/store/user";

export function NavbarMobile() {
  const user = userStore.getUser()
  const { t } = useTranslation();
  return (
      <nav className="navbar-mobile ">
        <ul className="navbar-mobile--ul">
          <li>
            <Link to="/$userId/gallery" params={{ userId: user.id.toString() }}>
              <Icon name="gallery" color="white" size="xl" /> {t("nav.home")}
            </Link>
          </li>
          <li className="navbar-mobile--plus-button">
            <Link to="/$userId/upload" params={{userId: user.id.toString()}}>
              <Icon name="plus" color="white" size="xl" />
            </Link>
          </li>
          <li>
            <Link to="/$userId/profile" params={{userId: user.id.toString()}}>
              <Icon name="user" color="white" size="xl" /> {t("nav.profile")}
            </Link>
          </li>
        </ul>
      </nav>
  );
}
