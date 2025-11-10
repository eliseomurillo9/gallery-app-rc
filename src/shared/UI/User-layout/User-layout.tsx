
import { Header } from "@shared/UI/Header/Header";
import { NavbarMobile } from "@shared/UI/Navbar/mobile/NavbarMobile";
import { Outlet } from "@tanstack/react-router";

export function UserLayout() {
  return (
    <>
      <Header />
      <main>
      <Outlet />
      </main>
      <NavbarMobile />
    </>
  )
}