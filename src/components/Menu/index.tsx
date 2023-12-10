import { Avatar, Box, Drawer, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { MAIN_PAGE } from "../../routes/pathnames"
import { useSidebarData } from "./constant"
import { QuizIcon } from "../../assets/icons"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { authLogout, selectUserId } from "../../store/Slices/auth"
import { addNotification } from "../../store/Slices/notification"
import { useRef, useState } from "react"
import { PROFILE_SETTINGS } from "../../utils/actions"
import ProfileSettings from "../AppProfileSettings"

type openToolType = {
    action: string,
    value: boolean
}

const Menu = () => {
    const { links, login, loginout, profile } = useSidebarData()
    const { t } = useTranslation('menu')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state: RootState) => selectUserId(state))
    const userPhoto = useSelector((state: RootState) => state.auth.user.photoURL)
    const avatarRef = useRef(null);

    const [openTool, setOpenTool] = useState<openToolType>({action: '', value: false});

    const handleLogout = () => {
        dispatch(authLogout())
        dispatch(addNotification({header: t('notificationLogoutHeader'), message: t('notificationLogoutMessage'), type: 'info', status: true}))
        navigate('/login')
    }

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

            {/* Login / Logout */}
            {userId ? 
                <Box className='menu__logout-container'>
                    <Box className="menu__user-image-container" ref={avatarRef} onClick={() => setOpenTool({action: PROFILE_SETTINGS, value: !openTool?.value})}>
                        <Avatar className='menu__user-image' alt="User U" src={userPhoto || undefined} />
                    </Box>

                    <ListItem className='menu-link logout' onClick={handleLogout}>
                        {loginout.Icon && <loginout.Icon className="menu-link__icon" />}
                        <ListItemText primary={loginout.title} />
                    </ListItem>
                </Box> : 
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

            {openTool?.action === PROFILE_SETTINGS && 
                <ProfileSettings open={openTool.value} setOpen={setOpenTool} anchorRef={avatarRef} />
            }
        </Drawer>
    )
}

export default Menu