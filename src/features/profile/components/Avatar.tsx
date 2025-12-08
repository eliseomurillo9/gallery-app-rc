
import './Avatar.css'
type AvatarProp = {
  src?: string
}
export function Avatar({ src }: AvatarProp) {
  return (
    <div className='avatar-wrapper'>
      <img src={src} alt='profile avatar' />
    </div>
  )
}