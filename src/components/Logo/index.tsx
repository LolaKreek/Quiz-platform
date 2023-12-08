import { Box, Typography } from "@mui/material"
import { QuizIcon } from "../../assets/icons"

const Logo = () => {
    return(
        <Box className="logo__root">
            <Box className="logo-root__wrapper">
                <QuizIcon className='logo__icon' />
                <Box display="flex">
                    <Typography className="text colored logo__header" variant='h3'><span className="logo-header__first-letter">Q</span>uiz</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Logo