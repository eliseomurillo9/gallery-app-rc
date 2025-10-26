import { Outlet } from "@tanstack/react-router";
import { Button } from "../../shared/UI/Button/Button";
import { Avatar } from "./components/Avatar";
import { Tabs } from "./components/tabs/Tabs";
import "./profile.css";
import { useTranslation } from "react-i18next";
export function ProfileView() {
  const { t } = useTranslation();
  return (
    <section className="profile-view">
      <div className="profile-view__header">
        <h1>{t("profile.title")}</h1>
        <div className="profile-view__header__actions">
          <Button variant="secondary" icon="logout" />
          <Button variant="secondary" icon="edit" />
        </div>
      </div>

      <div className="profile-view__container">
        <div className="profile-view__container__info">
          <Avatar />
          <h2>John Doe</h2>
        </div>
        <Tabs
          tabs={[
            { name: "gallery", active: true, link: "/profile/gallery" },
            { name: "album", active: false, link: "/profile/albums" },
            { name: "settings", active: false, link: "/profile/settings" },
          ]}
        />
        <div className="profile-view-layout">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
