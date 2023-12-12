import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { MapCar } from "./types/mapTypes"
import { RootState } from "../types"
import { api } from "../../api/api"
import { errorSnackbar } from "../snackbar/snackbarSlice"

const slicePath = "map"

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
}

const initialState: MapState = {
  loading: false,
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
      })
      .addCase(getMapData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) state.mapObjects = action.payload
      })
      .addCase(getMapData.rejected, (state) => {
        state.loading = false
      })
  },
})

export const mapSelector = (state: RootState) => state.mapReducer.mapObjects
export const mapLoading = (state: RootState) => state.mapReducer.loading
export default mapSlice.reducer
