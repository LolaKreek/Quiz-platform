import { Box, Typography } from '@mui/material'

type propsType = {
    children: any
    custom?: boolean
}

export const ErrorOverLay = ({children, custom = false }: propsType) => {
  return(
    <Box className='error__root'>
      {!custom && <Typography className='error__content'>
        {children}
      </Typography>}
      {custom && children}
    </Box>
  )
}