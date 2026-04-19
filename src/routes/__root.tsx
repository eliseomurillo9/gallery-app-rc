import {createRootRoute, redirect} from '@tanstack/react-router'
import App from '../App'
import {userStore} from "@/store/user.ts";

export const Route = createRootRoute({
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
  component: App,

})

