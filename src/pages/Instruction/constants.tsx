import { useMemo } from "react";
import { PROFESSOR_ALL_INSTRUCTION_PAGE, PROFESSOR_INSTRUCTION_PAGE } from "../../routes/pathnames";
import { useTranslation } from "react-i18next";

export const menuLinks = [
    {value: 'custom', title: 'Custom', path: PROFESSOR_INSTRUCTION_PAGE},
    {value: 'all', title: 'All', path: PROFESSOR_ALL_INSTRUCTION_PAGE}
]

const tableHeaders = [
    {value: 'title', title: 'Title'},
    {value: 'faculty', title: 'All'},
    {value: 'subject', title: 'All'},
    {value: 'date', title: 'All'},
    {value: 'empty', title: ''},
]

const tableAllHeaders = [
  {value: 'title', title: 'Title'},
  {value: 'faculty', title: 'All'},
  {value: 'subject', title: 'All'},
  {value: 'date', title: 'All'},
  {value: 'authorName', title: 'Author'},
  {value: 'empty', title: ''},
]

export const useTableData = () => {
    const { t } = useTranslation('main')
  
    const instructionHeaders = useMemo(() => {
      return tableHeaders.map(i => ({ ...i, title: t(`menuItems.instructions.${i.value}`) }))
    }, [t])

    const instructionAllHeaders = useMemo(() => {
      return tableAllHeaders.map(i => ({ ...i, title: t(`menuAllItems.instructions.${i.value}`) }))
    }, [t])
  
    return { instructionHeaders, instructionAllHeaders }
  }