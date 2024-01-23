import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { MapCar } from "./types/mapTypes"
import { RootState } from "../types"
import { api } from "../../api/api"
import { errorSnackbar } from "../snackbar/snackbarSlice"

const slicePath = "map"
const MAP_MAX_CONNECTION_ATTEMPTS = 3

export const getMapData = createAsyncThunk(
  "map/getMap",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get<MapCar[]>(slicePath)
      return response.data
    } catch (error) {
      void dispatch(errorSnackbar("Nie można pobrać pozycji taksówek"))
      return rejectWithValue([])
    }
  }
)

interface MapState {
  loading: boolean
  mapObjects: MapCar[]
  failedConnectionAttempts: number
}

const initialState: MapState = {
  loading: false,
  mapObjects: [],
  failedConnectionAttempts: 0,
}

const mapSlice = createSlice({
  name: "mapSlice",
  initialState,
  reducers: {
    reconnect(state) {
      state.failedConnectionAttempts = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMapData.pending, (state) => {
        state.loading = true
      })
      .addCase(getMapData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) {
          state.mapObjects = action.payload
          state.failedConnectionAttempts = 0
        }
      })
      .addCase(getMapData.rejected, (state) => {
        state.failedConnectionAttempts += 1
        state.loading = false
      })
  },
})

export const mapSelector = (state: RootState) => state.mapReducer.mapObjects
export const mapLoading = (state: RootState) => state.mapReducer.loading
export const mapDisconnected = (state: RootState) =>
  state.mapReducer.failedConnectionAttempts > MAP_MAX_CONNECTION_ATTEMPTS
export const { reconnect } = mapSlice.actions
export default mapSlice.reducer
