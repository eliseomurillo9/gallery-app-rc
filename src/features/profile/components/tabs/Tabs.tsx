import { Link, type FileRoutesByPath } from '@tanstack/react-router'
import './tabs.css'
type ProfileRoutes = FileRoutesByPath["/profile"]['path'] | FileRoutesByPath["/profile/albums"]['path'] |FileRoutesByPath["/profile/gallery"]['path']
type TabsProps = {
  tabs?: {
    name: string,
    active: boolean,
    link: ProfileRoutes
  }[]
}
export function Tabs ({ tabs = [] }: TabsProps) {
  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <Link key={tab.name} className="tab" to={`/profile/${tab.link}`}>
          {tab.name}
        </Link>
      ))}
    </div>
  )
}