import { Box } from "@mui/material";
import { Link } from "react-router-dom";

type menuItem = {
    value: string,
    path: string,
    title: string
}

type menuPropsType = {
    menuLinks: Array<menuItem>,
    current: string
}

const AppTopMenu = ({menuLinks, current}: menuPropsType) => {

    return(
        <Box className="app-top-menu__main-wrapper">
            {menuLinks.map((item:menuItem) => (
                <Link key={item.value} to={item.path} className={`app-top-menu__link-wrapper ${current === item.value ? 'active' : ''}`}>
                    {item.title}
                </Link>
            ))}
        </Box>
    )
}

export default AppTopMenu;