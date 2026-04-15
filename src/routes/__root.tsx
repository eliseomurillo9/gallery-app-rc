import {createRootRoute, redirect} from '@tanstack/react-router'
import App from '../App'
import {userStore} from "@/store/user.ts";

export const Route = createRootRoute({
  beforeLoad: async ({ location }
  ) => {
    const user = userStore
    user.loadUser();
    const pathRegex = new RegExp(/\/\d+/gm);
    if (!user.isUserAuthenticated()) {
      console.error("User NOT authenticated");
      throw redirect({
        to: "/signIn",
        search: {
          redirect: location.href,
        },
      });
    } else if (!pathRegex.test(location.pathname)) {
      throw redirect({to: user.getUser().id.toString()})
    }
  },
  component: App,

})

