import { Box } from "@mui/material";
import AppTopMenu from "../../components/AppTopMenu";
import { menuLinks } from "./constants";

const ProQuizPage = () => {
    return(
        <Box className="top-menu__wrapper">
            <AppTopMenu menuLinks={menuLinks} current="custom" type="quiz" />
        </Box>
    )
}

export default ProQuizPage;