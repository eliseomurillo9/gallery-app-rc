
import { Outlet } from '@tanstack/react-router'
import './App.css'
import { Header } from './shared/UI/Header/Header'
import { NavbarMobile } from './shared/UI/Navbar/mobile/NavbarMobile'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

function App() {

  return (
    <>
    <Header />
     <main>
        <Outlet />
     </main>
     <NavbarMobile />
      <TanStackRouterDevtools />
    </>
  )
}

export default App
