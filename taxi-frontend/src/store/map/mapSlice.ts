import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { MapCar } from "./types/mapTypes"
import axios from "axios"
import { RootState } from "../types"

const backendUrl = "http://localhost:8000/map"

export const getMapData = createAsyncThunk("map/getMap", async () => {
  try {
    const response = await axios.get<MapCar[]>(backendUrl)
    return response.data
  } catch (error) {
    console.error(error)
  }
})

interface MapState {
  loading: boolean
  error: string | null
  mapObjects: MapCar[]
}

const initialState: MapState = {
  loading: false,
  error: null,
  mapObjects: [],
}

const mapSlice = createSlice({
  name: "mapSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMapData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMapData.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        if (action.payload) state.mapObjects = action.payload
      })
      .addCase(getMapData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "An error occurred"
      })
  },
})

export const mapSelector = (state: RootState) => state.mapReducer.mapObjects
export const mapLoading = (state: RootState) => state.mapReducer.loading
export default mapSlice.reducer
