
import { Outlet, useLocation } from '@tanstack/react-router'
import './App.css'
import { Header } from './shared/UI/Header/Header'
import { NavbarMobile } from './shared/UI/Navbar/mobile/NavbarMobile'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useEffect, useState } from 'react'
import { initUserInfo } from './services/userService'
  
const PAGES_WITHOUT_MOBILE_LAYOUT = new Set(["/signin"])
await initUserInfo()

function App() {
  const [showLayout, setShowLayout] = useState(true)
  const location = useLocation().pathname
  useEffect(() => {
    setShowLayout(!PAGES_WITHOUT_MOBILE_LAYOUT.has(location))
  }, [location])
  return (
    <>
    {showLayout && <Header />}
     <main>
        <Outlet />
     </main>
     {showLayout && <NavbarMobile />}
      <TanStackRouterDevtools />
    </>
  )
}

export default App
