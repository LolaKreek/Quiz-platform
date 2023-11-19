import loadable from "@loadable/component"
import { LOGIN_PAGE, MAIN_PAGE } from "./pathnames"

const Dashboard = loadable(() => import("../features/auth/components/LoginForm"))
const Login = loadable(() => import("../features/auth/components/LoginForm"))

export const publicRoutes = [
    {
        path: MAIN_PAGE,
        Component: Dashboard,
    },
]

export const appRoutes = [
    {
        path: LOGIN_PAGE,
        Component: Login,
    },
]