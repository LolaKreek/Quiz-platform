import { useMemo } from "react";
import {
  PROFESSOR_ALL_INSTRUCTION_PAGE,
  PROFESSOR_INSTRUCTION_PAGE,
  STUDENT_ALL_INSTRUCTION_PAGE,
} from "../../routes/pathnames";
import { useTranslation } from "react-i18next";

export const menuLinks = [
  { value: "custom", title: "My documents", path: PROFESSOR_INSTRUCTION_PAGE },
  { value: "all", title: "The remaining", path: PROFESSOR_ALL_INSTRUCTION_PAGE },
];

export const studInstructionMenuLinks = [
  { value: "all", title: "All", path: STUDENT_ALL_INSTRUCTION_PAGE },
];

const instructionHeadersPlaceholder = [
  { value: "title", title: "Title" },
  { value: "faculty", title: "All" },
  { value: "subject", title: "All" },
  { value: "date", title: "All" },
  { value: "empty", title: "" },
];

const instructionAllHeadersPlaceholder = [
  { value: "title", title: "Title" },
  { value: "faculty", title: "All" },
  { value: "subject", title: "All" },
  { value: "date", title: "All" },
  { value: "authorName", title: "Author" },
  { value: "empty", title: "" },
];

const proUsersPlaceholders = [
  { value: "name", title: "Name" },
  { value: "email", title: "Email" },
  { value: "phone", title: "Phone" },
  { value: "passed", title: "Passed quizes" },
  { value: "ranking", title: "Ranking" },
  { value: "empty", title: "" },
];

const studUsersPlaceholders = [
  { value: "name", title: "Name" },
  { value: "email", title: "Email" },
  { value: "phone", title: "Phone" },
  { value: "created", title: "Created quizes" },
  { value: "empty", title: "" },
];

const proQuizHeadersPlaceholder = [
  { value: "title", title: "Title" },
  { value: "faculty", title: "Faculty" },
  { value: "subject", title: "Subject" },
  { value: "date", title: "Date" },
  { value: "questions", title: "Questions" },
];

const proQuizAllHeadersPlaceholder = [
  { value: "title", title: "Title" },
  { value: "faculty", title: "Faculty" },
  { value: "subject", title: "Subject" },
  { value: "authorName", title: "Author" },
  { value: "date", title: "Date" },
  { value: "questions", title: "Questions" },
];

const studQuizAllHeadersPlaceholder = [
  { value: "title", title: "Title" },
  { value: "faculty", title: "All" },
  { value: "subject", title: "All" },
  { value: "questions", title: "Questions" },
  { value: "authorName", title: "Author" },
  { value: "date", title: "All" },
];

const studQuizHistoryHeadersPlaceholder = [
  { value: "title", title: "Title" },
  { value: "faculty", title: "All" },
  { value: "subject", title: "All" },
  { value: "questions", title: "Questions" },
  { value: "authorName", title: "Author" },
  { value: "date", title: "Date" },
  { value: "elapsed", title: "Elapsed" },
  { value: "completed", title: "Completed" },
];

const studQuizWrongAnswersHeadersPlaceholder = [
  { value: "question", title: "Questions" },
  { value: "quiz", title: "Quiz" },
  { value: "result", title: "Result" },
  { value: "correct", title: "Correct answers" },
];

const studQuizFavoritesHeadersPlaceholder = [
  { value: "title", title: "Title" },
  { value: "faculty", title: "All" },
  { value: "subject", title: "All" },
  { value: "questions", title: "Questions" },
  { value: "authorName", title: "Author" },
];

const studQuizResultsHeadersPlaceholder = [
  { value: "title", title: "Title" },
  { value: "faculty", title: "All" },
  { value: "subject", title: "All" },
  { value: "questions", title: "Questions" },
  { value: "authorName", title: "Author" },
  { value: "date", title: "All" },
  { value: "mark", title: "All" },
];

export const useTableData = () => {
  const { t } = useTranslation("main");

  const instructionHeaders = useMemo(() => {
    return instructionHeadersPlaceholder.map((i) => ({
      ...i,
      title: t(`menuItems.instructions.${i.value}`),
    }));
  }, [t]);

  const instructionAllHeaders = useMemo(() => {
    return instructionAllHeadersPlaceholder.map((i) => ({
      ...i,
      title: t(`menuAllItems.instructions.${i.value}`),
    }));
  }, [t]);

  const studUsersHeaders = useMemo(() => {
    return studUsersPlaceholders.map((i) => ({
      ...i,
      title: t(`menuAllItems.users.${i.value}`),
    }));
  }, [t]);

  const proUsersHeaders = useMemo(() => {
    return proUsersPlaceholders.map((i) => ({
      ...i,
      title: t(`menuAllItems.users.${i.value}`),
    }));
  }, [t]);

  const proQuizAllHeaders = useMemo(() => {
    return proQuizAllHeadersPlaceholder.map((i) => ({
      ...i,
      title: t(`menuAllItems.quiz.${i.value}`),
    }));
  }, [t]);

  const proQuizHeaders = useMemo(() => {
    return proQuizHeadersPlaceholder.map((i) => ({
      ...i,
      title: t(`menuItems.quiz.${i.value}`),
    }));
  }, [t]);

  const studQuizAllHeaders = useMemo(() => {
    return studQuizAllHeadersPlaceholder.map((i) => ({
      ...i,
      title: t(`menuAllItems.quiz.${i.value}`),
    }));
  }, [t]);

  const studQuizHistoryHeaders = useMemo(() => {
    return studQuizHistoryHeadersPlaceholder.map((i) => ({
      ...i,
      title: t(`menuItems.quiz.${i.value}`),
    }));
  }, [t]);

  const studQuizWrongAnswersHeaders = useMemo(() => {
    return studQuizWrongAnswersHeadersPlaceholder.map((i) => ({
      ...i,
      title: t(`menuItems.quiz.${i.value}`),
    }));
  }, [t]);

  const studQuizFavoritesHeaders = useMemo(() => {
    return studQuizFavoritesHeadersPlaceholder.map((i) => ({
      ...i,
      title: t(`menuItems.quiz.${i.value}`),
    }));
  }, [t]);

  const studQuizResultsHeaders = useMemo(() => {
    return studQuizResultsHeadersPlaceholder.map((i) => ({
      ...i,
      title: t(`menuItems.quiz.${i.value}`),
    }));
  }, [t]);

  return {
    instructionHeaders,
    instructionAllHeaders,
    proQuizHeaders,
    proQuizAllHeaders,
    studUsersHeaders,
    proUsersHeaders,
    studQuizAllHeaders,
    studQuizHistoryHeaders,
    studQuizResultsHeaders,
    studQuizFavoritesHeaders,
    studQuizWrongAnswersHeaders
  };
};
