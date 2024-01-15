import { Box, ClickAwayListener, Grow, Paper, Popper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SunIcon from "../../assets/icons/sun.png";
import MoonIcon from "../../assets/icons/moon.png";
import { PROFILE_SETTINGS } from "../../utils/actions";
import { useDispatch } from "react-redux";
import { changeTheme } from "../../store/Slices/theme";
import i18n from 'i18next'

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
    
    const [activeLanguage, setActiveLanguage] = useState<'en' | 'pl'>('pl');

    const handleLanguageChange = (language: 'en' | 'pl') => {
        setActiveLanguage(language);
        if(language == 'en'){
            i18n.changeLanguage(language)
        } else if (language == 'pl') {
            i18n.changeLanguage(language)
        }
    };

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
            <ClickAwayListener onClickAway={() => {setOpen({action: PROFILE_SETTINGS, value: false})}}>
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

                    <Box className="profile-settings__theme-wrapper">
                        <Typography >{t('languageTitle')}</Typography>

                        <Box className="profile-settings__modes-wrapper">
                            <Typography 
                            className={activeLanguage === 'en' ? 'profile-settings__active-language' : ''}
                            onClick={() => handleLanguageChange('en')}>
                                {t('en')}
                            </Typography>
                            <Typography 
                            className={activeLanguage === 'pl' ? 'profile-settings__active-language' : ''}
                            onClick={() => handleLanguageChange('pl')}>
                                {t('pl')}
                            </Typography>
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