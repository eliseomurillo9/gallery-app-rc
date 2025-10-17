import { Link, type FileRoutesByPath } from '@tanstack/react-router'
import './tabs.css'
import { Icon } from '../../../../shared/UI/Icon/Icon'
type ProfileRoutes = FileRoutesByPath["/profile/settings"]['fullPath'] | FileRoutesByPath["/profile/albums"]['fullPath'] |FileRoutesByPath["/profile/gallery"]['fullPath']
type TabsProps = {
  tabs?: {
    name: string,
    active: boolean,
    link: ProfileRoutes
  }[]
}
export function Tabs ({ tabs = [] }: Readonly<TabsProps>) {
  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <Link key={tab.name} className="tab" to={tab.link} activeProps={{ className: 'tab__active' }}>
          <Icon name={tab.name} size="large" />
        </Link>
      ))}
    </div>
  )
}