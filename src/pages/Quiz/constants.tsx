import {
  PROFESSOR_ALL_QUIZ_PAGE,
  PROFESSOR_QUIZ_PAGE,
  STUDENT_ALL_QUIZ_PAGE,
  STUDENT_HISTORY_QUIZ_PAGE,
  STUDENT_QUIZ_PAGE,
  STUDENT_RESULTS_QUIZ_PAGE,
} from "../../routes/pathnames";

export const menuLinks = [
  { value: "custom", title: "Custom", path: PROFESSOR_QUIZ_PAGE },
  { value: "all", title: "All", path: PROFESSOR_ALL_QUIZ_PAGE },
];

export const studentMenuLinks = [
  { value: "all", title: "All", path: STUDENT_ALL_QUIZ_PAGE },
  { value: "history", title: "History", path: STUDENT_HISTORY_QUIZ_PAGE },
  { value: "results", title: "Results", path: STUDENT_RESULTS_QUIZ_PAGE },
];
