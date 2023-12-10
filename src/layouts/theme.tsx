import { PaletteMode } from "@mui/material";

export const lightTheme = {
  // palette values for light mode
  primary: {
    main: '#6062FF'
  },
  // divider: amber[200],
  text: {
    primary: '#6062FF',
    paper: '#11111',
    box: '#11111'
  },
  background: {
    default: '#F0F0FF',
  },
  components : {
    MuiCssBaseLine : {
      styleOverrides : {
        body : {
          "& .profile-settings__popper" : {
            border: '1px solid red!important'
          }
        }
      }
    }
  }
}

export const darkTheme = {
  // palette values for dark mode
    // divider: deepOrange[700],
    background: {
      default: '#242424',
    },
    text: {
      primary: '#fff',
      secondary: '#6062FF',
    },
  primary: {
    main: '#6062FF',
  },
}

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light') ? {
      lightTheme
    } : {
      darkTheme
    }
  },
  typography: {
    fontFamily: [
      'Readex Pro',
      'sans-serif'
    ].join(','),
    fontWeightRegular: 300,
  }
});