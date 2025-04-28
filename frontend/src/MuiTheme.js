import { createTheme } from '@mui/material/styles';
import { blue, green, yellow } from '@mui/material/colors'

export default createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: '#dc004e',
    },
    pending: {
      main: '#ff9800',
    },
    inprogress: {
      main: yellow[400],
    },
    completed: {
      main: green[400],
    }
  }
});