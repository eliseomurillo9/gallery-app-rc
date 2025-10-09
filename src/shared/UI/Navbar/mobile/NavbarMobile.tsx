import { Link } from "@tanstack/react-router";
import { Icon } from "../../Icon/Icon";
import "./NavbarMobile.css";
import { useTranslation } from "react-i18next";

export function NavbarMobile() {
  const { t } = useTranslation();
  return (
      <nav className="navbar-mobile ">
        <ul className="navbar-mobile--ul">
          <li>
            <Link to="/gallery">
              <Icon name="gallery" color="white" size="xl" /> {t("nav.home")}
            </Link>
          </li>
          <li className="navbar-mobile--plus-button">
            <Link to="/upload">
              <Icon name="plus" color="white" size="xl" />
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <Icon name="user" color="white" size="xl" /> {t("nav.profile")}
            </Link>
          </li>
        </ul>
      </nav>
  );
}
