import {
  PROFESSOR_ALL_QUIZ_PAGE,
  PROFESSOR_QUIZ_PAGE,
  STUDENT_ALL_QUIZ_PAGE,
  STUDENT_FAVORITES_QUIZ_PAGE,
  STUDENT_HISTORY_QUIZ_PAGE,
  STUDENT_QUIZ_PAGE,
  STUDENT_RESULTS_QUIZ_PAGE,
} from "../../routes/pathnames";

export const menuLinks = [
  { value: "custom", title: "My quizzes", path: PROFESSOR_QUIZ_PAGE },
  { value: "all", title: "The remaining", path: PROFESSOR_ALL_QUIZ_PAGE },
];

export const studentMenuLinks = [
  { value: "all", title: "Wszystkie", path: STUDENT_ALL_QUIZ_PAGE },
  { value: "history", title: "Historia", path: STUDENT_HISTORY_QUIZ_PAGE },
  { value: "results", title: "Wyniki", path: STUDENT_RESULTS_QUIZ_PAGE },
  { value: "favorites", title: "Ulubione", path: STUDENT_FAVORITES_QUIZ_PAGE },
];
