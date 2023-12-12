import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice.ts"
import mapReducer from "./map/mapSlice"

export const createReducer = () => combineReducers({ authReducer, mapReducer })
