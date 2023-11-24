import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";
import CloseIcon from '@mui/icons-material/Close';

import { propsType } from "./types";
import './styles.scss'

const Notification = ({message, element, header, type}: propsType) => {
    console.log("element: ", element);
    return(
        <Box className={`notification__root ${type === 'error' ? 'error' : (type === 'success' ? 'success' : 'info')}`}>
            <Box className='notification__content'>
                <Typography className="notification__header">{header}</Typography>
                <Typography className="notification__message">{message}</Typography>
            </Box>
            
            <Box className="notification__close-icon" onClick={() => toast.dismiss(element.id)}>
                <CloseIcon />
            </Box>
        </Box>
    )
}

export default Notification;