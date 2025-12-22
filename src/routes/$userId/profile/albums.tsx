import { createFileRoute } from '@tanstack/react-router'
import { AlbumsView } from '../../../features/albums/albums.view'

export const Route = createFileRoute('/$userId/profile/albums')({
  component: AlbumsView,
})
