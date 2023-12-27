import { PROFESSOR_ALL_QUIZ_PAGE, PROFESSOR_QUIZ_PAGE, STUDENT_QUIZ_PAGE } from "../../routes/pathnames";

export const menuLinks = [
    {value: 'custom', title: 'Custom', path: PROFESSOR_QUIZ_PAGE},
    {value: 'all', title: 'All', path: PROFESSOR_ALL_QUIZ_PAGE}
]

export const studentMenuLinks = [
    {value: 'all', title: 'All', path: STUDENT_QUIZ_PAGE}
]