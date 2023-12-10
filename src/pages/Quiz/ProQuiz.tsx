import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { AppButton } from "../../components/AppButton";
import { useNavigate } from "react-router-dom";
import { PROFESSOR_ADD_QUIZ_PAGE } from "../../routes/pathnames";

const ProQuizPage = () => {
    const { t } = useTranslation('quiz')
    const navigate = useNavigate();

    return(
        <Box className="top-menu__wrapper">
            <Typography className="top-menu__title">{t('title')}</Typography>

            <AppButton
                onClick={() => navigate(PROFESSOR_ADD_QUIZ_PAGE)}
                className='top-menu__button'
            >
                {t('addNewQuizBtn')}
            </AppButton>
        </Box>
    )
}

export default ProQuizPage;