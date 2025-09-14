import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/categories"!</div>
}
