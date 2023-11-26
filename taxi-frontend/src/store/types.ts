import { store } from "./store.ts"

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
