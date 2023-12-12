import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { Button, CssBaseline, ThemeProvider } from "@mui/material"
import theme from "./assets/theme.ts"
import { Provider } from "react-redux"
import { store } from "./store/store.ts"
import { closeSnackbar, SnackbarProvider } from "notistack"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          autoHideDuration={5000}
          action={(key) => (
            <Button
              style={{ color: "white" }}
              color="secondary"
              onClick={() => closeSnackbar(key)}
            >
              Zamknij
            </Button>
          )}
        />
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
