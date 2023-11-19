import { Box } from "@mui/material"
import Menu from "../../components/Menu"
import './styles.scss'

type Props = {
    children: string | JSX.Element | JSX.Element[]
}

export const MainLayout = ({ children }: Props) => {
  return(
    <Box className='root'>
      <Menu />
      <Box className='router-view'>
        {children}
      </Box>
    </Box>
  )
}