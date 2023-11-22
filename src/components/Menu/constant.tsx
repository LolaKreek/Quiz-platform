import { useTranslation } from "react-i18next";
import { 
    INSTRUCTION_PAGE, 
    LOGIN_PAGE, 
    LOGOUT_PAGE, 
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
    {
        path: PROFILE_PAGE,
        translationKey: 'profile',
        Icon: ProfileIcon,
        exact: true
    }
]

const settingLinks = [
    {
        path: LOGIN_PAGE,
        translationKey: 'login',
        Icon: LoginIcon,
        exact: true
    },
    {
        path: LOGOUT_PAGE,
        translationKey: 'logout',
        Icon: LogoutIcon,
        exact: true
    },
]

export const useSidebarData = () => {
    const { t } = useTranslation('menu')
  
    const links = useMemo(() => {
      return menuLinks.map(i => ({ ...i, title: t(`menuLinks.${i.translationKey}`) }))
    }, [t])

    const settings = useMemo(() => {
        return settingLinks.map(i => ({ ...i, title: t(`menuSettings.${i.translationKey}`) }))
      }, [t])
  
    return { links, settings }
  }