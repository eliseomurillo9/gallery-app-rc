import type { Color, Size } from "../../types/Types";
import "./Icon.css";
import { icons } from "./icons";
import type { Icon } from "./icons";
type IconProps = {
  name: Icon
  size?: Size;
  color?: Color;
}

const iconVariants = {
  iconColors: {
    primary: "icon-primary",
    secondary: "icon-secondary",
    white: "icon-white",
    danger: "icon-danger",
    success: "icon-success",
    info: "icon-info",
    warning: "icon-warning",
  },
  iconSizes: {
    small: "icon-small",
    base: "icon-base",
    medium: "icon-medium",
    large: "icon-large",
    xl: "icon-xlarge",
    "2xl": "icon-2xlarge",
  },
};

export function Icon({ name, size, color = "white" }: Readonly<IconProps>) {
  const sizeClass = iconVariants.iconSizes[size || "base"];
  const colorClass = iconVariants.iconColors[color];

  return (
      <div className={`${colorClass} ${sizeClass}`}>{icons[name]}</div>

  );
}
