import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type questionBoxPropsType = {
    title: string,
    type: string
}

const QuestionBox = ({title, type}:questionBoxPropsType) => {
    const { t } = useTranslation('quiz');

    return(
        <Box className="question-box">
            <Box className="question-box__main-wrapper">
                <Box>
                    <Typography className="box-label">{t('quiestionTitle')}</Typography>
                    <Typography className="question-box__content">{title}</Typography>
                </Box>
                
                <Box>
                    <Typography className="box-label">{t('quiestionType')}</Typography>
                    <Typography className="question-box__content">{type}</Typography>
                </Box>
            </Box>

            <Box className="question-box__button-wrapper">
                <EditIcon className="question-box__icon" />
                <DeleteIcon className="question-box__icon" />
            </Box>
        </Box>
    )
}

export default QuestionBox;