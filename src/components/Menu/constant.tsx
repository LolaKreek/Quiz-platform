
import { useTranslation } from "react-i18next";
import { 
    INSTRUCTION_PAGE, 
    LOGIN_PAGE,
    MAIN_PAGE, 
    PROFILE_PAGE, 
    PROFESSOR_QUIZ_PAGE, 
    STUDENT_ALL_QUIZ_PAGE,
    PROFESSOR_INSTRUCTION_PAGE,
    PROFESSOR_USERS_PAGE,
    STUDENT_USERS_PAGE,
} from "../../routes/pathnames";
import { useMemo } from "react";
import { InstructionIcon, LoginIcon, LogoutIcon, ProfileIcon, QuizIcon, PeopleIcon } from "../../assets/icons";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const professorLinks =[
    {
        path: MAIN_PAGE,
        translationKey: 'dashboard',
        Icon: SpaceDashboardIcon,
        exact: true
    },
    {
        path: PROFESSOR_QUIZ_PAGE,
        translationKey: 'quiz',
        Icon: QuizIcon,
        exact: true
    },
    {
        path: PROFESSOR_INSTRUCTION_PAGE,
        translationKey: 'instruction',
        Icon: InstructionIcon,
        exact: true
    },
    {
        path: PROFESSOR_USERS_PAGE,
        translationKey: 'students',
        Icon: PeopleIcon,
        exact: true
    },
]

const studentLinks =[
    {
        path: MAIN_PAGE,
        translationKey: 'dashboard',
        Icon: SpaceDashboardIcon,
        exact: true
    },
    {
        path: STUDENT_ALL_QUIZ_PAGE,
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
        path: STUDENT_USERS_PAGE,
        translationKey: 'professors',
        Icon: PeopleIcon,
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
    const user = useSelector((state: RootState) => state.auth.user);
    
    // Here implement role validation => 
    // if professor links === professorLinks else links === studentLinks
    const links = useMemo(() => {
        if (user.role === 'professor') {
          return professorLinks.map(i => ({ ...i, title: t(`menuLinks.${i.translationKey}`) }))
        // replace with unlogged user links later
        } else {
            return studentLinks.map(i => ({ ...i, title: t(`menuLinks.${i.translationKey}`) }))
        } 
    }, [t, user.role])

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