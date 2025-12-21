import "./Popover.css";
import React, { type ReactNode } from "react";
import { Icon } from "@shared/UI/Icon/Icon";

type MenuImageProps = {
  isOpen: boolean;
  title?: string;
  children: ReactNode
};




export function Popover({ isOpen, title, children, }: Readonly<MenuImageProps>) {
   return isOpen && (
    <div className="tools-bar-menu">
      <header className="tools-bar-menu--header">
        <h2>{title}</h2>
        <Icon name="close"/>
      </header>
      <main>{ children }</main>
    </div>
  )

}

export const Body: React.FC<{ children: ReactNode }> = ({ children }) => (
  <p>{children}</p>
);

;