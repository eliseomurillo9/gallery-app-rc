import { Icon } from "../Icon/Icon";
import "./Header.css";
import vaultoriaIsotype from "../../../assets/logo/logo-horizontal.png";
export function Header() {
  return (
    <header className="header">
      <img src={vaultoriaIsotype} alt="Vaultoria Logo" />
      <Icon name="menu" size="large" color="white" />
    </header>
  );
}
