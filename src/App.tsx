import { Outlet } from "@tanstack/react-router";
import "./App.css";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { initUserInfo } from "./services/userService";

await initUserInfo();
function App() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export default App;
