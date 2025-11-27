import { Outlet } from "@tanstack/react-router";
import { Button } from "../../shared/UI/Button/Button";
import { Avatar } from "./components/Avatar";
import { Tabs } from "./components/tabs/Tabs";
import "./profile.css";
import { useTranslation } from "react-i18next";
import { userStore } from "@/store/user";
export function ProfileView() {
  const user = userStore.getUser();
  const userId = user.id.toString();
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
          <h2>{user?.name ?? "Unknown user"}</h2>
        </div>
        <Tabs
          tabs={[
            {
              name: "gallery",
              link: { path: `/$userId/profile/gallery`, id: userId },
            },
            {
              name: "album",
              link: { path: `/$userId/profile/albums`, id: userId },
            },
            {
              name: "settings",
              link: { path: `/$userId/profile/settings`, id: userId },
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
