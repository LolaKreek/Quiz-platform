import loadable from "@loadable/component"
import { 
    INSTRUCTION_PAGE, 
    LOGIN_PAGE,
    REGISTER_PAGE,
    MAIN_PAGE, 
    PROFILE_PAGE,
    PROFESSOR_QUIZ_PAGE,
    STUDENT_QUIZ_PAGE,
    PROFESSOR_ADD_QUIZ_PAGE, 

} from "./pathnames"

const Dashboard = loadable(() => import("../features/auth/components/LoginForm"))
const Instruction = loadable(() => import("../pages/Instruction/index"))
const Profile = loadable(() => import("../pages/Profile/index"))
const Login = loadable(() => import("../pages/Auth/Login"))
const SignIn = loadable(() => import("../pages/Auth/SignIn"))

const ProQuiz = loadable(() => import("../pages/Quiz/ProQuiz"))
const ProQuizAdd = loadable(() => import("../components/Modules/Professor/AddQuizModal/index"))

const StudentQuiz = loadable(() => import("../pages/Quiz/StudentQuiz"))

export const publicRoutes = [
    {path: MAIN_PAGE, Component: Dashboard},
]

export const appRoutes = [
    {path: LOGIN_PAGE, Component: Login},
    {path: REGISTER_PAGE, Component: SignIn},
    {path: INSTRUCTION_PAGE, Component: Instruction},
    {path: PROFILE_PAGE, Component: Profile},

    {path: PROFESSOR_QUIZ_PAGE, Component: ProQuiz},
    {path: PROFESSOR_ADD_QUIZ_PAGE, Component: ProQuizAdd},

    {path: STUDENT_QUIZ_PAGE, Component: StudentQuiz},
]