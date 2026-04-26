import {Header} from "@shared/UI/Header/Header";
import {NavbarMobile} from "@shared/UI/Navbar/mobile/NavbarMobile";
import {SideBar} from "@shared/UI/SideBar/SideBar.tsx";

type LayoutProps = {
    children: React.ReactNode
}

export function Layout(layoutProps: LayoutProps) {
    const {children} = layoutProps;
    return(
        <>
            <Header/>
            <SideBar />
            <main>
                {children}
            </main>
            <NavbarMobile/>
        </>
    )
}