import { Box, CircularProgress } from '@mui/material'
import clsx from 'clsx'

type Props = {
    show: boolean,
    className?: string,
    size?: number
}

export const AppLoader = ({ show, className, size }: Props) => {
  if (!show) return null

  return (
    <Box className={clsx('app-loader__root', className)}>
      <CircularProgress size={size ? size : 24} />
    </Box>
  )
}