import { useTranslation } from "react-i18next";
import { 
    INSTRUCTION_PAGE, 
    LOGIN_PAGE,
    MAIN_PAGE, 
    PROFILE_PAGE, 
    QUIZ_PAGE 
} from "../../routes/pathnames";
import { useMemo } from "react";
import { InstructionIcon, LoginIcon, LogoutIcon, ProfileIcon, QuizIcon } from "../../assets/icons";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';

const menuLinks = [
    {
        path: MAIN_PAGE,
        translationKey: 'dashboard',
        Icon: SpaceDashboardIcon,
        exact: true
    },
    {
        path: QUIZ_PAGE,
        translationKey: 'quiz',
        Icon: QuizIcon,
        exact: true
    },
    {
        path: INSTRUCTION_PAGE,
        translationKey: 'instruction',
        Icon: InstructionIcon,
        exact: true
    },
]

const profileLink = {
    path: PROFILE_PAGE,
    translationKey: 'profile',
    Icon: ProfileIcon,
    exact: true
}

const loginLink = {
    path: LOGIN_PAGE,
    translationKey: 'login',
    Icon: LoginIcon,
    exact: true
}

const logoutLink = {
    translationKey: 'logout',
    Icon: LogoutIcon,
    exact: true
}

export const useSidebarData = () => {
    const { t } = useTranslation('menu')
  
    const links = useMemo(() => {
      return menuLinks.map(i => ({ ...i, title: t(`menuLinks.${i.translationKey}`) }))
    }, [t])

    const profile = useMemo(() => {
        return { ...profileLink, title: t(`${profileLink.translationKey}`) }
    }, [t])

    const login = useMemo(() => {
        return { ...loginLink, title: t(`menuSettings.${loginLink.translationKey}`) }
    }, [t])

    const loginout = useMemo(() => {
        return { ...logoutLink, title: t(`menuSettings.${logoutLink.translationKey}`) }
    }, [t])
  
    return { links, login, loginout, profile }
  }