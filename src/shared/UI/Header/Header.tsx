import { Icon } from "../Icon/Icon";
import "./Header.css";
export function Header() {
  return (
    <header className="header">
      <h1>Vaultoria</h1>
      <Icon name="menu" size="large" color="white" />
    </header>
  );
}