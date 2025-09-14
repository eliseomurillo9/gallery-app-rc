import Avatarimg from '../../../assets/img/20250616_131630.jpg'
import './Avatar.css'
type AvatarProp = {
  src?: string
}
export function Avatar({ src }: AvatarProp) {
  return (
    <div className='avatar-wrapper'>
      <img src={Avatarimg || src} alt='profile avatar' />
    </div>
  )
}