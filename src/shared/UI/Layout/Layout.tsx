import {Header} from "@shared/UI/Header/Header";
import {NavbarMobile} from "@shared/UI/Navbar/mobile/NavbarMobile";

type LayoutProps = {
    children: React.ReactNode
}

export function Layout(layoutProps: LayoutProps) {
    const {children} = layoutProps;
    return(
        <>
            <Header/>
            <main>
                {children}
            </main>
            <NavbarMobile/>
        </>
    )
}