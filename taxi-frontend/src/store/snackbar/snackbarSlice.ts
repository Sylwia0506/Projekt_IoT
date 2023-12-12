import { createAsyncThunk } from "@reduxjs/toolkit"
import { enqueueSnackbar } from "notistack"

export const successSnackbar = createAsyncThunk(
  "/snackbar/success",
  (message: string) => {
    enqueueSnackbar(message, {
      variant: "success",
    })
  }
)

export const infoSnackbar = createAsyncThunk(
  "/snackbar/info",
  (message: string) => {
    enqueueSnackbar(message, {
      variant: "info",
    })
  }
)

export const warningSnackbar = createAsyncThunk(
  "/snackbar/warning",
  (message: string) => {
    enqueueSnackbar(message, {
      variant: "warning",
    })
  }
)

export const errorSnackbar = createAsyncThunk(
  "/snackbar/error",
  (message: string) => {
    enqueueSnackbar(message, {
      variant: "error",
    })
  }
)
