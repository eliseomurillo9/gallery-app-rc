import { Link, type FileRoutesByPath } from "@tanstack/react-router";
import "./tabs.css";
import { Icon } from "@/shared/UI/Icon/Icon";
import type { Icon as IconType } from "@shared/UI/Icon/icons";
type ProfileRoutes =
  | FileRoutesByPath["/$userId/profile/albums"]["fullPath"]
  | FileRoutesByPath["/$userId/profile/gallery"]["fullPath"]
  | FileRoutesByPath["/$userId/profile/settings"]["fullPath"];
type TabsProps = {
  tabs?: {
    name: IconType;
    link: {
      id: string;
      path: ProfileRoutes;
    };
  }[];
};

export function Tabs({ tabs = [] }: Readonly<TabsProps>) {
  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          className="tab"
          to={tab.link.path}
          params={{ userId: tab.link.id }}
          activeProps={{ className: "tab__active" }}
        >
          <Icon name={tab.name} size="large" />
        </Link>
      ))}
    </div>
  );
}
