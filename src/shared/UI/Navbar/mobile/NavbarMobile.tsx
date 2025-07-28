import { Link } from "@tanstack/react-router";
import { Icon } from "../../Icon/Icon";
import "./NavbarMobile.css";
export function NavbarMobile() {
  return (
      <nav className="navbar-mobile ">
        <ul className="navbar-mobile--ul">
          <li>
            <Link to="/photos">
              <Icon name="gallery" color="white" size="xl" /> Gallery
            </Link>
          </li>
          <li className="navbar-mobile--plus-button">
            <Link to="/upload">
              <Icon name="plus" color="white" size="xl" />
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <Icon name="user" color="white" size="xl" /> Profile
            </Link>
          </li>
        </ul>
      </nav>
  );
}
