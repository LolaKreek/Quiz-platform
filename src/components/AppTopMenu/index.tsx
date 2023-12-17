import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { AppButton } from "../AppButton";
import { useTranslation } from "react-i18next";

type menuItem = {
    value: string,
    path: string,
    title: string
}

type menuPropsType = {
    menuLinks: Array<menuItem>,
    current: string,
    type: "instruction" | "quiz",
    handleAction?: any,
}

const AppTopMenu = ({menuLinks, current, type, handleAction}: menuPropsType) => {
    const { t } = useTranslation('menu')

    return(
        <Box className="app-top-menu">
            <Box className="app-top-menu__main-wrapper">
                {menuLinks.map((item:menuItem) => (
                    <Link key={item.value} to={item.path} className={`app-top-menu__link-wrapper ${current === item.value ? 'active' : ''}`}>
                        {item.title}
                    </Link>
                ))}
            </Box>

            <Box className="app-top-menu__button-wrapper">
                {type === 'instruction' && current === "custom" && 
                    <Box>
                        <AppButton
                            className="app-top-menu__button"
                            onClick={handleAction}
                        >
                            {t('uploadFileBtn')}
                        </AppButton>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default AppTopMenu;