import { createFileRoute } from '@tanstack/react-router'
import { ProfileView } from '../features/profile/profile.view'

export const Route = createFileRoute('/profile')({
  component: ProfileView,
})