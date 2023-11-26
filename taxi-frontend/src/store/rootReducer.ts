import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice.ts"

export const createReducer = () => combineReducers({ authReducer })
