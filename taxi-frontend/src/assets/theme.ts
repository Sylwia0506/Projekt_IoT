import { createTheme, Theme } from "@mui/material"
import { red } from "@mui/material/colors"

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
