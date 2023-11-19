import { Box } from "@mui/material"
import './styles.scss'

type Props = {
    children: string | JSX.Element | JSX.Element[]
}

export const MainLayout = ({ children }: Props) => {
  return(
    <Box className='root'>
      {/* <Sidebar /> */}
      <Box className='router-view'>
        {children}
      </Box>
    </Box>
  )
}