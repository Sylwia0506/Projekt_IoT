import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice.ts"
import mapReducer from "./map/mapSlice"
import taxiReducer from "./taxis/taxiSlice"
import courseReducer from "./course/courseSlice"

export const createReducer = () => combineReducers({ authReducer, mapReducer, taxiReducer, courseReducer })