import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice.ts"
import taxiReducer from "./taxis/taxiSlice.ts"

export const createReducer = () => combineReducers({ authReducer, taxiReducer })
