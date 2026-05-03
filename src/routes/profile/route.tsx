import { createFileRoute, redirect } from '@tanstack/react-router'
import {lazy} from "react";

const ProfileView = lazy(() => import("@features/profile/profile.view.tsx"))
export const Route = createFileRoute('/profile')({
    beforeLoad: ({location}) => {
      const pathRegex = /^\/profile$/gm
      if (pathRegex.test(location.pathname)) {
        throw redirect({ to: '/profile/gallery',  throw: true });
      }
  },
  component: ProfileView,
})
