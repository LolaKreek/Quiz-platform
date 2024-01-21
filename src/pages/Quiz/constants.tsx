import {
  PROFESSOR_ALL_QUIZ_PAGE,
  PROFESSOR_QUIZ_PAGE,
  PROFESSOR_USERS_FAVORITES_PAGE,
  PROFESSOR_USERS_PAGE,
  STUDENT_ALL_QUIZ_PAGE,
  STUDENT_FAVORITES_QUIZ_PAGE,
  STUDENT_HISTORY_QUIZ_PAGE,
  STUDENT_QUIZ_PAGE,
  STUDENT_RESULTS_QUIZ_PAGE,
  STUDENT_USERS_FAVORITES_PAGE,
  STUDENT_USERS_PAGE,
} from "../../routes/pathnames";

export const menuLinks = [
  { value: "custom", title: "My quizzes", path: PROFESSOR_QUIZ_PAGE },
  { value: "all", title: "The remaining", path: PROFESSOR_ALL_QUIZ_PAGE },
];

export const studentsUsersmenuLinks = [
  { value: "all", title: "All", path: STUDENT_USERS_PAGE },
  { value: "favorites", title: "Favorites", path: STUDENT_USERS_FAVORITES_PAGE },
];

export const proUsersmenuLinks = [
  { value: "all", title: "All", path: PROFESSOR_USERS_PAGE },
  { value: "favorites", title: "Favorites", path: PROFESSOR_USERS_FAVORITES_PAGE },
];

export const studentMenuLinks = [
  { value: "all", title: "All", path: STUDENT_ALL_QUIZ_PAGE },
  { value: "history", title: "History", path: STUDENT_HISTORY_QUIZ_PAGE },
  { value: "results", title: "Results", path: STUDENT_RESULTS_QUIZ_PAGE },
  { value: "favorites", title: "Favorites", path: STUDENT_FAVORITES_QUIZ_PAGE },
];
