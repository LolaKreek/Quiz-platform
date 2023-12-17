import loadable from "@loadable/component"
import { 
    LOGIN_PAGE,
    REGISTER_PAGE,
    MAIN_PAGE, 
    PROFILE_PAGE,
    PROFESSOR_QUIZ_PAGE,
    STUDENT_QUIZ_PAGE,
    PROFESSOR_ADD_QUIZ_PAGE,
    PROFESSOR_INSTRUCTION_PAGE,
    PROFESSOR_ALL_INSTRUCTION_PAGE,
    PROFESSOR_ALL_QUIZ_PAGE, 

} from "./pathnames"

const Dashboard = loadable(() => import("../features/auth/components/LoginForm"))
const Profile = loadable(() => import("../pages/Profile/index"))
const Login = loadable(() => import("../pages/Auth/Login"))
const SignIn = loadable(() => import("../pages/Auth/SignIn"))

const ProQuiz = loadable(() => import("../pages/Quiz/ProQuiz"))
const ProAllQuiz = loadable(() => import("../pages/Quiz/ProQuizAll"))
const ProQuizAdd = loadable(() => import("../components/Modules/Professor/AddQuizModal/index"))

const ProInstruction = loadable(() => import("../pages/Instruction/ProInstruction"))
const ProAllInstruction = loadable(() => import("../pages/Instruction/ProAllInstructions"))

const StudentQuiz = loadable(() => import("../pages/Quiz/StudentQuiz"))

export const publicRoutes = [
    {path: MAIN_PAGE, Component: Dashboard},
]

export const appRoutes = [
    {path: LOGIN_PAGE, Component: Login},
    {path: REGISTER_PAGE, Component: SignIn},
    {path: PROFILE_PAGE, Component: Profile},

    {path: PROFESSOR_QUIZ_PAGE, Component: ProQuiz},
    {path: PROFESSOR_ALL_QUIZ_PAGE, Component: ProAllQuiz},
    {path: PROFESSOR_ADD_QUIZ_PAGE, Component: ProQuizAdd},

    {path: PROFESSOR_INSTRUCTION_PAGE, Component: ProInstruction},
    {path: PROFESSOR_ALL_INSTRUCTION_PAGE, Component: ProAllInstruction},

    {path: STUDENT_QUIZ_PAGE, Component: StudentQuiz},
]