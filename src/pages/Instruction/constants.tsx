import { useMemo } from "react";
import { PROFESSOR_ALL_INSTRUCTION_PAGE, PROFESSOR_INSTRUCTION_PAGE } from "../../routes/pathnames";
import { useTranslation } from "react-i18next";

export const menuLinks = [
    {value: 'custom', title: 'Custom', path: PROFESSOR_INSTRUCTION_PAGE},
    {value: 'all', title: 'All', path: PROFESSOR_ALL_INSTRUCTION_PAGE}
]

const instructionHeadersPlaceholder = [
    {value: 'title', title: 'Title'},
    {value: 'faculty', title: 'All'},
    {value: 'subject', title: 'All'},
    {value: 'date', title: 'All'},
    {value: 'empty', title: ''},
]

const instructionAllHeadersPlaceholder = [
  {value: 'title', title: 'Title'},
  {value: 'faculty', title: 'All'},
  {value: 'subject', title: 'All'},
  {value: 'date', title: 'All'},
  {value: 'authorName', title: 'Author'},
  {value: 'empty', title: ''},
]

const quizHeadersPlaceholder = [
  {value: "title", title: "Title"},
  {value: "faculty", title: "Faculty"},
  {value: "subject", title: "Subject"},
  {value: "date", title: "Date"},
  {value: "questions", title: "Questions"},
]

export const useTableData = () => {
    const { t } = useTranslation('main')
  
    const instructionHeaders = useMemo(() => {
      return instructionHeadersPlaceholder.map(i => ({ ...i, title: t(`menuItems.instructions.${i.value}`) }))
    }, [t])

    const instructionAllHeaders = useMemo(() => {
      return instructionAllHeadersPlaceholder.map(i => ({ ...i, title: t(`menuAllItems.instructions.${i.value}`) }))
    }, [t])

    const quizAllHeaders = useMemo(() => {
      return quizHeadersPlaceholder.map(i => ({ ...i, title: t(`menuItems.quiz.${i.value}`) }))
    }, [t])

    const quizHeaders = useMemo(() => {
      return quizHeadersPlaceholder.map(i => ({ ...i, title: t(`menuAllItems.quiz.${i.value}`) }))
    }, [t])
  
    return { instructionHeaders, instructionAllHeaders, quizHeaders, quizAllHeaders }
  }