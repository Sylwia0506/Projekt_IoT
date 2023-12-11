import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { TaxiCar } from "./types/taxiTypes.ts"
import axios from "axios"
import { RootState } from "../types"

export const getTaxis = createAsyncThunk("taxi/getTaxis", async () => {
  try {
    const response = await axios.get<TaxiCar[]>("http://localhost:8000/taxi")
    return response.data
  } catch (error) {
    console.error(error)
  }
})

interface TaxiState {
  loading: boolean
  error: string | null
  taxis: TaxiCar[]
}

const initialState: TaxiState = {
  loading: false,
  error: null,
  taxis: [],
}

const taxiSlice = createSlice({
  name: "taxiSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTaxis.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getTaxis.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        if (action.payload) state.taxis = action.payload
      })
      .addCase(getTaxis.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "An error occurred"
      })
  },
})

export const taxisSelector = (state: RootState) => state.taxiReducer.taxis
export const taxisLoading = (state: RootState) => state.taxiReducer.loading
export default taxiSlice.reducer
