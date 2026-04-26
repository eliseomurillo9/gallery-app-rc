import './sideBar.css'
import {Link} from "@tanstack/react-router";
import {Icon} from "@shared/UI/Icon/Icon.tsx";
import {userStore} from "@/store/user.ts";
import vaultoriaIsotype from "@/assets/logo/logo-horizontal.png";

const NAV_LINKS = [
    {
        icon: "gallery",
        name: "Gallery",
    },
    {
        icon: "user",
        name: "User",
    },
    {
        icon: "album",
        name: "Albums",
    }
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
                                <li>
                                    <Link to="/" className="side-bar--link">
                                        <Icon name={link.icon} color="white" size="xl"/> <span>{link.name}</span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
            <div className="side-bar--head">
                <div className="head--identity">
                    <div className="head--user-avatar">
                        <img src={user.avatar} alt="user profile image"/>
                    </div>
                    <span>{user.name}</span>
                </div>
                <Icon name={"logout"} color={"primary"} size={"large"}/>
            </div>
        </div>
    )
}