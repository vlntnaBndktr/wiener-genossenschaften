// theme.js
import { createTheme } from '@mui/material/styles';

const myTheme = createTheme({
  palette: {
    primary: {
      light: '#F0F0F0',
      main: '#8B8B8B',
      dark: '#000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#DF1524',
      main: '#E8473D',
      dark: '#992211',
      contrastText: '#000',
    },
  },
});

export default myTheme;
