import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#2e7992',
      darker: '#17526a',
      lighter: '#b1cad6',
      contrast: '#a14a2c',
      contrastDarker: '#76271e',
      white: '#ffffff',
    },
    background: {
        default: "#f2f2f2",
        white: '#fff',
        selected: '#c0e0ff',
        lavender: '#cfbdff'
    },
    grayscale: {
        offWhite: "#fcfcfc",
        white: "#fff",
        black: '#222',
        gray: '#4c4c4c',
        lightGray: '#dfdfdf',
        grayLight: '#87878e'
    }
  },
  fonts: {
    small: '0.8rem'
  },
  padding: {
    main: '40px 40px 40px 40px',
    tight: '10px 10px 10px 10px'
  }
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

export default theme;