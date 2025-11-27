import { createFileRoute, redirect } from '@tanstack/react-router'
import { ProfileView } from '../../../features/profile/profile.view'

export const Route = createFileRoute('/$userId/profile')({
    beforeLoad: ({location, params}) => {
      const page = location.pathname.split('/')
      if (page[2] === 'profile' && !page[3]) {
        throw redirect({ to: '/$userId/profile/gallery',  throw: true, params: { userId: params.userId } });
      }
  },
  component: ProfileView,
})