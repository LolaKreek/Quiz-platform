import { createTheme, useMediaQuery } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
     main: '#6062FF',
    },
  },
  typography: {
    fontFamily: [
      'Readex Pro',
      'sans-serif'
    ].join(','),
    fontWeightRegular: 300,
  }
});

export const useIsMobile = () => {
  return useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true })
}