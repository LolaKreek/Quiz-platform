import loadable from "@loadable/component";
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
  PROFESSOR_EDIT_QUIZ_PAGE,
  STUDENT_ALL_QUIZ_PAGE,
  STUDENT_HISTORY_QUIZ_PAGE,
} from "./pathnames";
import StudentQuizHistory from "../pages/Quiz/StudentQuizHistory";

const Dashboard = loadable(
  () => import("../features/auth/components/LoginForm")
);
const Profile = loadable(() => import("../pages/Profile/index"));
const Login = loadable(() => import("../pages/Auth/Login"));
const SignIn = loadable(() => import("../pages/Auth/SignIn"));

const ProQuiz = loadable(() => import("../pages/Quiz/ProQuiz"));
const ProAllQuiz = loadable(() => import("../pages/Quiz/ProQuizAll"));
const ProQuizAdd = loadable(
  () => import("../components/Modules/Professor/Quiz/AddQuizModal/index")
);
const ProQuizEdit = loadable(
  () => import("../components/Modules/Professor/Quiz/EditQuizModal/index")
);

const ProInstruction = loadable(
  () => import("../pages/Instruction/ProInstruction")
);
const ProAllInstruction = loadable(
  () => import("../pages/Instruction/ProAllInstructions")
);

const StudentQuizAll = loadable(() => import("../pages/Quiz/StudentQuizAll"));
const StudentQuiz = loadable(() => import("../pages/Quiz/StudentQuiz"));

export const publicRoutes = [{ path: MAIN_PAGE, Component: Dashboard }];

export const appRoutes = [
  { path: LOGIN_PAGE, Component: Login, role: null },
  { path: REGISTER_PAGE, Component: SignIn, role: null },
  { path: PROFILE_PAGE, Component: Profile, role: null },

  { path: PROFESSOR_QUIZ_PAGE, Component: ProQuiz, role: "professor" },
  { path: PROFESSOR_ALL_QUIZ_PAGE, Component: ProAllQuiz, role: "professor" },
  { path: PROFESSOR_ADD_QUIZ_PAGE, Component: ProQuizAdd, role: "professor" },
  { path: PROFESSOR_EDIT_QUIZ_PAGE, Component: ProQuizEdit, role: "professor" },

  { path: PROFESSOR_INSTRUCTION_PAGE, Component: ProInstruction, role: "professor" },
  { path: PROFESSOR_ALL_INSTRUCTION_PAGE, Component: ProAllInstruction, role: "professor" },

  { path: STUDENT_QUIZ_PAGE, Component: StudentQuiz, role: "student" },
  { path: STUDENT_ALL_QUIZ_PAGE, Component: StudentQuizAll, role: "student" },
  { path: STUDENT_HISTORY_QUIZ_PAGE, Component: StudentQuizHistory, role: "student" },
];
