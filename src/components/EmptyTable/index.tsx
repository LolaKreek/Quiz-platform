import { Box, Typography } from "@mui/material"
import EmptyIcon from '../../assets/icons/emptyPage.png'
import { useTranslation } from "react-i18next"

const EmptyTable = () => {
    const { t } = useTranslation('main')

    return(
        <Box className="empty-table__main-wrapper">
            <Typography className="empty-table__header">{t('emptyPageTitle')}</Typography>
            <img className="empty-table__icon" src={EmptyIcon} />
        </Box>
    )
}

export default EmptyTable