import { Box } from "@mui/material"
import AppTopMenu from "../../components/AppTopMenu"
import { menuLinks } from "./constants";

const ProQuizAll = () => {
    return(
        <Box>
            <AppTopMenu menuLinks={menuLinks} current="all" type="quiz" />
        </Box>
    )
}

export default ProQuizAll;