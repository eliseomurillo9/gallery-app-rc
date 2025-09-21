import { createFileRoute } from '@tanstack/react-router'
import { albumsView } from '../../features/albums/albums.view'

export const Route = createFileRoute('/profile/albums')({
  component: albumsView,
})
