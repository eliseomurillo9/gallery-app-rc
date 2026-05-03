import { Outlet } from "@tanstack/react-router";
import { Button } from "@shared/UI/Button/Button.tsx";
import { Avatar } from "./components/Avatar";
import { Tabs } from "./components/tabs/Tabs";
import "./profile.css";
import { useTranslation } from "react-i18next";
import { userStore } from "@/store/user";
export default function ProfileView() {
  const user = userStore.getUser();
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
          <Avatar src={user.avatar}/>
          <h2>{user?.name ?? "Unknown user"}</h2>
        </div>
        <Tabs
          tabs={[
            {
              name: "gallery",
              path: '/profile/gallery',
            },
            {
              name: "album",
              path: '/profile/albums'
            },
            {
              name: "settings",
              path: '/profile/settings'
            },
          ]}
        />
        <div className="profile-view-layout">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
