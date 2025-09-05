import Avatarimg from '../../../assets/img/20250616_131630.jpg'
import './Avatar.css'
export function Avatar(avatarUrl?: string) {
  return (
    <div className='avatar-wrapper'>
      <img src={Avatarimg || avatarUrl} alt='profile avatar' />
    </div>
  )
}