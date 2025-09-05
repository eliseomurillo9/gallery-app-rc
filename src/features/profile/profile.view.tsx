import { Button } from '../../shared/UI/Button/Button';
import { Avatar } from './components/avatar';
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
          <Avatar />
          <h2>John Doe</h2>
        </div>
        <p>Manage your account settings and preferences here.</p>
      </div>
    </section>
  )  
}