import loadable from "@loadable/component"
import { 
    INSTRUCTION_PAGE, 
    LOGIN_PAGE,
    MAIN_PAGE, 
    PROFILE_PAGE, 
    QUIZ_PAGE 
} from "./pathnames"

const Dashboard = loadable(() => import("../features/auth/components/LoginForm"))
const Quiz = loadable(() => import("../pages/Quiz/index"))
const Instruction = loadable(() => import("../pages/Instruction/index"))
const Profile = loadable(() => import("../pages/Profile/index"))
const Login = loadable(() => import("../pages/Auth/Login"))

export const publicRoutes = [
    {path: MAIN_PAGE, Component: Dashboard},
]

export const appRoutes = [
    {path: LOGIN_PAGE, Component: Login},
    {path: QUIZ_PAGE, Component: Quiz},
    {path: INSTRUCTION_PAGE, Component: Instruction},
    {path: PROFILE_PAGE, Component: Profile},
]