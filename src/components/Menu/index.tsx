import { Drawer, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Link, NavLink } from "react-router-dom"
import { MAIN_PAGE } from "../../routes/pathnames"
import { useSidebarData } from "./constant"
import { QuizIcon } from "../../assets/icons"
import { useTranslation } from "react-i18next"

import './styles.scss'

const Menu = () => {
    const { links, settings } = useSidebarData()
    const { t } = useTranslation('menu')

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
                        // activeClassName='activeLink'
                        className='link'
                        key={path}
                    >
                        <ListItem className='menu-link'>
                            {Icon && <Icon className="menu-link__icon" />}
                            <ListItemText primary={title} />
                        </ListItem>
                    </NavLink>
                ))}
            </List>

            <List className='menu__logout-container'>
                {settings.map(({ Icon, title, path }) => (
                    <NavLink
                        to={path}
                        // activeClassName='activeLink'
                        className='link'
                        key={path}
                    >
                        <ListItem className='menu-link'>
                            {Icon && <Icon className="menu-link__icon" />}
                            <ListItemText primary={title} />
                        </ListItem>
                    </NavLink>
                ))}
            </List>
        </Drawer>
    )
}

export default Menu