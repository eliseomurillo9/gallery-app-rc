import { createFileRoute } from '@tanstack/react-router'
import { settingsView } from '../../features/settings/settings.view'

export const Route = createFileRoute('/profile/settings')({
  component: settingsView,
})