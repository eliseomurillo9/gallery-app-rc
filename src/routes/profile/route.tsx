import { createFileRoute, redirect } from '@tanstack/react-router'
import { ProfileView } from '../../features/profile/profile.view'

export const Route = createFileRoute('/profile')({
    beforeLoad: ({location}) => {
      console.log('------', location)
      console.log("Current location:", location.pathname);
      if (location.pathname === '/profile' || location.pathname === '/profile/') {
        throw redirect({ to: "/profile/gallery",  throw: true, });
      }
  },
  component: ProfileView,
})