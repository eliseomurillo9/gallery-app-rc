
import { isUserAuthenticated } from "../../services/authService";
import { UserLayout } from "@shared/UI/User-layout/User-layout";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute('/$userId')({
  beforeLoad: async ({location}) => {
    if (!isUserAuthenticated()) {
      throw redirect({
        to: '/signIn',
        search: {
          redirect: location.href
        }
      })
    }
  },
  component: UserLayout,
}) 