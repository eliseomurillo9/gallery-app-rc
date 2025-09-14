import { Outlet } from '@tanstack/react-router';
import { Button } from '../../shared/UI/Button/Button';
import { Avatar } from './components/Avatar';
import { Tabs } from './components/tabs/Tabs';
import './profile.css';
export function ProfileView() {
  return (
    <section className="profile-view">
      <div className='profile-view__header'>
        <h1>User Profile</h1>
        <div className='profile-view__header__actions'>
        <Button variant="secondary" icon='logout' />
        <Button variant="secondary" icon='edit' />
        </div>
      </div>

      <div className="profile-view__container">
        <div className='profile-view__container__info'>
          <Avatar/>
          <h2>John Doe</h2>
        </div>
        <Tabs tabs={[{ name: "gallery", active: true, link: "/gallery" }, { name: "categories", active: false, link: "/categories" }, { name: "settings", active: false, link: "/profile/settings" }]} />
        <Outlet  />
      </div>
    </section>
  )  
}