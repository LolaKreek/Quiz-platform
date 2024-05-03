import {
  PROFESSOR_ALL_QUIZ_PAGE,
  PROFESSOR_QUIZ_PAGE,
  PROFESSOR_USERS_FAVORITES_PAGE,
  PROFESSOR_USERS_PAGE,
  STUDENT_ALL_QUIZ_PAGE,
  STUDENT_FAVORITES_QUIZ_PAGE,
  STUDENT_HISTORY_QUIZ_PAGE,
  STUDENT_RESULTS_QUIZ_PAGE,
  STUDENT_USERS_FAVORITES_PAGE,
  STUDENT_USERS_PAGE,
  STUDENT_WRONG_QUIZ_PAGE,
} from "../../routes/pathnames";

export const menuLinks = [
  { value: "custom", title: "Moje testy", path: PROFESSOR_QUIZ_PAGE },
  { value: "all", title: "Pozostałe", path: PROFESSOR_ALL_QUIZ_PAGE },
];

export const studentsUsersmenuLinks = [
  { value: "all", title: "Wszystkie", path: STUDENT_USERS_PAGE },
  { value: "favorites", title: "Ulubione", path: STUDENT_USERS_FAVORITES_PAGE },
];

export const proUsersmenuLinks = [
  { value: "all", title: "Wszystkie", path: PROFESSOR_USERS_PAGE },
  { value: "favorites", title: "Ulubione", path: PROFESSOR_USERS_FAVORITES_PAGE },
];

export const studentMenuLinks = [
  { value: "all", title: "Wszystkie", path: STUDENT_ALL_QUIZ_PAGE },
  { value: "history", title: "Historia", path: STUDENT_HISTORY_QUIZ_PAGE },
  { value: "results", title: "Wyniki", path: STUDENT_RESULTS_QUIZ_PAGE },
  { value: "favorites", title: "Ulubione", path: STUDENT_FAVORITES_QUIZ_PAGE },
  { value: "misstakes", title: "Niepoprawne odpowiedzi", path: STUDENT_WRONG_QUIZ_PAGE },
];
