import './tabs.css'
type TabsProps = {
  tabs?: {
    name: string,
    active: boolean
  }[]
}
export function Tabs ({ tabs = [] }: TabsProps) {
  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <div key={tab.name} className={`tab ${tab.active ? 'active' : ''}`}>
          {tab.name} - {tab.active ? "Active" : "Inactive"}
        </div>
      ))}
    </div>
  )
}