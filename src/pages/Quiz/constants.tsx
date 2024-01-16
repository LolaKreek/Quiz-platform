import {
  PROFESSOR_ALL_QUIZ_PAGE,
  PROFESSOR_QUIZ_PAGE,
  STUDENT_ALL_QUIZ_PAGE,
  STUDENT_HISTORY_QUIZ_PAGE,
  STUDENT_QUIZ_PAGE,
  STUDENT_RESULTS_QUIZ_PAGE,
} from "../../routes/pathnames";
import { useTranslation } from "react-i18next";

export const useQuizMenuLinks = () => {
  const { t } = useTranslation("quiz");
 
  const menuLinks = [
    { value: "custom", title: t('menuLinks.all'), path: PROFESSOR_QUIZ_PAGE },
    { value: "all", title: t('menuLinks.theRemaining'), path: PROFESSOR_ALL_QUIZ_PAGE },
  ];
 
  const studentMenuLinks = [
    { value: "all", title: t('studentMenuLinks.all'), path: STUDENT_ALL_QUIZ_PAGE },
    { value: "history", title: t('studentMenuLinks.history'), path: STUDENT_HISTORY_QUIZ_PAGE },
    { value: "results", title: t('studentMenuLinks.results'), path: STUDENT_RESULTS_QUIZ_PAGE },
  ];
 
  return { menuLinks, studentMenuLinks };
 };
