import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";

import { AppButton } from "../../components/AppButton";
import { AddQuizModule } from "../../components/Modules/AddQuizModule";
import './styles.scss'

const QuizPage = () => {
    const { t } = useTranslation('quiz')
    const anchorRef = useRef(null);

    const [openAddQuizModule, setOpenAddQuizModule] = useState(false);

    return(
        <Box className="top-menu__wrapper">
            <Typography className="top-menu__title">{t('title')}</Typography>

            <AppButton
                ref={anchorRef}
                onClick={() => setOpenAddQuizModule(true)}
                className='top-menu__button'
            >
                {t('addNewQuizBtn')}
            </AppButton>

            {openAddQuizModule && 
                <AddQuizModule 
                    onClose={() => setOpenAddQuizModule(false)} 
                    anchorRef={anchorRef} 
                />
            }
        </Box>
    )
}

export default QuizPage;