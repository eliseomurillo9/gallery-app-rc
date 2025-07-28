import type { Color, Size } from "../../types/Types";
import "./Icon.css";
type IconProps = {
  name: keyof typeof Icons;
  size?: Size;
  color?: Color;
};

const Icons = {
  home: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
      <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
    </svg>
  ),
  plus: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
      <path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z" />
    </svg>
  ),
  gallery: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
    </svg>
  ),
  user: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
  ),
  menu: (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
)
};

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
  },
};

export function Icon({ name, size, color = "primary" }: IconProps) {
  const sizeClass = iconVariants.iconSizes[size || "base"];
  const colorClass = iconVariants.iconColors[color];

  return (
    <>
      <div className={`${colorClass} ${sizeClass}`}>{Icons[name]}</div>
    </>
  );
}
