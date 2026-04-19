import { createFileRoute } from '@tanstack/react-router'
import { AlbumsView } from '@features/albums/albums.view.tsx'

export const Route = createFileRoute('/profile/albums')({
  component: AlbumsView,
})
