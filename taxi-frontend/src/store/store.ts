import { configureStore } from "@reduxjs/toolkit"
import { createReducer } from "./rootReducer.ts"

export const store = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
