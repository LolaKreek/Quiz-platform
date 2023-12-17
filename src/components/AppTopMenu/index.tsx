import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AppButton } from "../AppButton";
import { useTranslation } from "react-i18next";
import { PROFESSOR_ADD_QUIZ_PAGE } from "../../routes/pathnames";

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
    const navigate = useNavigate();

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

                {type === 'quiz' && current === "custom" && 
                    <AppButton
                        onClick={() => navigate(PROFESSOR_ADD_QUIZ_PAGE)}
                        className='top-menu__button'
                    >
                        {t('addNewQuizBtn')}
                    </AppButton>
                }
            </Box>
        </Box>
    )
}

export default AppTopMenu;