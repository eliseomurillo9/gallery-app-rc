import { Link, type FileRoutesByPath } from '@tanstack/react-router'
import './tabs.css'
import { Icon } from '../../../../shared/UI/Icon/Icon'
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
        <Link key={tab.name} className="tab" to={`/profile/${tab.link}`} activeProps={{ className: 'tab__active' }}>
          <Icon name={tab.name} size="large" />
        </Link>
      ))}
    </div>
  )
}