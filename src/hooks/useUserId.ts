import { useMatch } from "@tanstack/react-router"

export function useUserId(required = true) {
  const match = useMatch({ from: '/$userId/gallery' })
  const userId = match?.params.userId

  if (required && !userId) {
    throw new Error('useUserId() called outside of a /$userId route')
  }

  return userId
}
