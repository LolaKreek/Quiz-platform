import { Drawer, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Link, NavLink } from "react-router-dom"
import { MAIN_PAGE } from "../../routes/pathnames"
import { useSidebarData } from "./constant"
import { QuizIcon } from "../../assets/icons"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { selectUserId } from "../../store/Slices/auth"

import './styles.scss'

const Menu = () => {
    const { links, login, loginout, profile } = useSidebarData()
    const { t } = useTranslation('menu')
    const userId = useSelector((state: RootState) => selectUserId(state))

    return(
        <Drawer
            className='menu__drawer'
            variant="permanent"
            anchor="left"
            classes={{ paper: 'drawer'}}
            open
        >
            <Link to={MAIN_PAGE} className='menu__logo-container logo'>
                <QuizIcon className="logo__icon" />
                <Typography 
                    className="logo__page-name"
                    dangerouslySetInnerHTML = {{__html: t('quiz')} }
                />
            </Link>
            
            <List className='menu__links-container'>
                {links.map(({ Icon, title, path }) => (
                    <NavLink
                        to={path}
                        className={({ isActive }) => isActive ? "active" : "link-unactive" }
                        key={path}
                    >
                        <ListItem className='menu-link'>
                            {Icon && <Icon className="menu-link__icon" />}
                            <ListItemText primary={title} />
                        </ListItem>
                    </NavLink>
                ))}
                {userId && <NavLink
                        to={profile.path}
                        className={({ isActive }) => isActive ? "active" : "link-unactive" }
                        key={profile.path}
                    >
                        <ListItem className='menu-link'>
                            {profile.Icon && <profile.Icon className="menu-link__icon" />}
                            <ListItemText primary={profile.title} />
                        </ListItem>
                    </NavLink>
                }
            </List>

            {userId ? 
                <List className='menu__logout-container'>
                    <NavLink
                        to={loginout.path}
                        className={({ isActive }) => isActive ? "active" : "link-unactive" }
                        key={loginout.path}
                    >
                        <ListItem className='menu-link'>
                            {loginout.Icon && <loginout.Icon className="menu-link__icon" />}
                            <ListItemText primary={loginout.title} />
                        </ListItem>
                    </NavLink>
                </List> : 
                <List className='menu__logout-container'>
                    <NavLink
                        to={login.path}
                        className={({ isActive }) => isActive ? "active" : "link-unactive" }
                        key={login.path}
                    >
                        <ListItem className='menu-link'>
                            {login.Icon && <login.Icon className="menu-link__icon" />}
                            <ListItemText primary={login.title} />
                        </ListItem>
                    </NavLink>
                </List>
            }
        </Drawer>
    )
}

export default Menu