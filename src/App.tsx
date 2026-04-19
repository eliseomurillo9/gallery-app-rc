import { Outlet } from "@tanstack/react-router";
import './config/env';
import "./App.css";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {Layout} from "@shared/UI/Layout/Layout.tsx";

function App() {
  return (
    <Layout>
      <Outlet/>
      <TanStackRouterDevtools/>
    </Layout>
  );
}

export default App;
