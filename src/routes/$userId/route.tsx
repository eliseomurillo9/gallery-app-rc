import { UserLayout } from "@shared/UI/User-layout/User-layout";
import { createFileRoute, redirect } from "@tanstack/react-router";
import {userStore} from "@/store/user.ts";

export const Route = createFileRoute("/$userId")({
  beforeLoad: async ({ location }
  ) => {
    const user = userStore
    user.loadUser();
    if (!user.isUserAuthenticated()) {
      console.error("User NOT authenticated");
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
