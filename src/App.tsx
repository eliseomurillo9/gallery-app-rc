import { Outlet } from "@tanstack/react-router";
import "./App.css";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

function App() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export default App;
