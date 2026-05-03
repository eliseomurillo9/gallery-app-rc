import './sideBar.css'
import {Link} from "@tanstack/react-router";
import {Icon} from "@shared/UI/Icon/Icon.tsx";
import type {Icon as IconType} from "@shared/UI/Icon/icons"
import {userStore} from "@/store/user.ts";
import vaultoriaIsotype from "@/assets/logo/logo-horizontal.png";

const NAV_LINKS: { id: string, icon: IconType; name: string; route: string }[] = [
    {
        id: "GALLERY_NAV",
        icon: "gallery",
        name: "Gallery",
        route: '/'
    },
    {
        id: "ALBUM_NAV",
        icon: "album",
        name: "Albums",
        route: '/profile/albums'
    },
    {
        id: "PLUS_NAV",
        icon: "plus",
        name: "Upload",
        route: '/upload'
    },
    {
        id: "SETTINGS_NAV",
        icon: "settings",
        name: "settings",
        route: '/profile/settings'
    },
]

export const SideBar = () => {
    const user = userStore.getUser();
    return (
        <div className="side-bar--container">
            <img src={vaultoriaIsotype} alt="Vaultoria Logo" className="side-bar-logo" />
            <nav className="side-bar--nav">
                <ul className="side-bar--ul">
                    {
                        NAV_LINKS.map((link) => {
                            return (
                                <li key={link.id}>
                                    <Link to={link.route} className="side-bar--link" activeProps={{className: "nav__active"}}>
                                        <Icon name={link.icon} color="white" size="large"/> <span>{link.name}</span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
            <div className="side-bar--footer">
                <Link to='/profile' className="head--identity" activeProps={{className: "nav__active"}}>
                    <div className="head--user-avatar">
                        <img src={user.avatar} alt="user profile image"/>
                    </div>
                    <span>{user.name}</span>
                </Link>
                <Icon name={"logout"} color={"primary"} size={"large"}/>
            </div>
        </div>
    )
}
