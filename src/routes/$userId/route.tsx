import { UserLayout } from "@shared/UI/User-layout/User-layout";
import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/$userId")({
  component: UserLayout,
  notFoundComponent: () => {
    return (
        <div>
          <p>Template NOT FOUND</p>
        </div>
    )
  },
});
