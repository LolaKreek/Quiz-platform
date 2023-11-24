import { Box } from "@mui/material";
import LoginForm from "../../features/auth/components/LoginForm";
import Logo from "../../components/Logo";
import "./styles.scss"

const LoginPage = () => {

    return(
        <Box className="login-page__wrapper">
            <Logo />
            <LoginForm />
        </Box>
    )
}

export default LoginPage;