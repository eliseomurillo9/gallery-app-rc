import { isUserAuthenticated, hydrateUser } from "../../services/authService";
import { UserLayout } from "@shared/UI/User-layout/User-layout";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$userId")({
  beforeLoad: async ({ location }) => {
    console.log();
    if (isUserAuthenticated()) {
      hydrateUser();
    } else {
      throw redirect({
        to: "/signIn",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: UserLayout,
});
