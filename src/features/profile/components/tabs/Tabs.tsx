import { Link } from '@tanstack/react-router'
import './tabs.css'
type TabsProps = {
  tabs?: {
    name: string,
    active: boolean,
    link: string
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