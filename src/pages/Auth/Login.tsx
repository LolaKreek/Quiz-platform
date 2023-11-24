import { Box } from "@mui/material";
import LoginForm from "../../features/auth/components/LoginForm";
import Logo from "../../components/Logo";
import "./styles.scss"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification, selectNotificationStatus } from "../../store/Slices/notification";
import toast from "react-hot-toast";
import Notification from "../../components/Notification";
import { RootState } from "../../store";

const LoginPage = () => {
    const dispatch = useDispatch();

    const notificationState = useSelector((state: RootState) => selectNotificationStatus(state));
    const notificationHeader = useSelector((state: RootState) => state.notification.header);
    const notificationMessage = useSelector((state: RootState) => state.notification.message);
    const notificationType = useSelector((state: RootState) => state.notification.type);

    const [notification, setNotification] = useState(notificationState)

    useEffect(() => {
        if(notification){
            setNotification(false)
            dispatch(deleteNotification())
            toast.custom((element) => (
                <Notification header={notificationHeader} message={notificationMessage} element={element} type={notificationType}/>
            ), {position: "bottom-center"});
        }
    }, [])

    return(
        <Box className="login-page__wrapper">
            <Logo />
            <LoginForm />
        </Box>
    )
}

export default LoginPage;