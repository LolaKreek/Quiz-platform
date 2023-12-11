import { Box, ClickAwayListener, Grow, Paper, Popper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from '@mui/icons-material/Close';
import SunIcon from "../../assets/icons/sun.png";
import MoonIcon from "../../assets/icons/moon.png";
import { PROFILE_SETTINGS } from "../../utils/actions";
import { useDispatch } from "react-redux";
import { changeTheme } from "../../store/Slices/theme";

type profileSettingsType = {
    open: boolean,
    anchorRef: any,
    setOpen: any
}

const ProfileSettings = ({open, setOpen, anchorRef}: profileSettingsType) => {
    const { t } = useTranslation('main');
    const dispatch = useDispatch();

    const handleDarkMode = () => {
        dispatch(changeTheme({theme: 'dark'}))
    }

    const handleLightMode = () => {
        dispatch(changeTheme({theme: 'light'}))
    }

    return(
        <Popper
            className='profile-settings__popper'
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            placement="right"
        >
        {({ TransitionProps }) => (
        <Grow
            {...TransitionProps}
        >
            <Paper className='profile-settings__paper'>
            <ClickAwayListener onClickAway={() => {console.log('OKKKK');setOpen({action: PROFILE_SETTINGS, value: false})}}>
                <Box>
                    <Box className="profile-settings__header-wrapper">
                        <Typography className="profile-settings__title">{t('profileSettingsTitle')}</Typography>
                        <CloseIcon className="profile-settings__close-icon" onClick={() => setOpen({action: PROFILE_SETTINGS, value: false})} />
                    </Box>

                    <Box className="profile-settings__theme-wrapper">
                        <Typography>{t('themeTitle')}</Typography>

                        <Box className="profile-settings__modes-wrapper">
                            <img className="profile-settings__theme-icon" src={SunIcon} onClick={handleLightMode} />
                            <img className="profile-settings__theme-icon" src={MoonIcon} onClick={handleDarkMode} />
                        </Box>
                    </Box>
                </Box>
            </ClickAwayListener>
            </Paper>
        </Grow>
        )}
            
        </Popper>
    )
}

export default ProfileSettings;