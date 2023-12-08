import { Box } from "@mui/material"
import Logo from "../../components/Logo"
import SignInForm from "../../features/auth/components/SignInForm"

const SignIn = () => {
    return(
        <Box className="login-page__wrapper">
            <Logo />
            <SignInForm />
        </Box>
    )
}

export default SignIn