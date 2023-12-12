import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { TaxiCar } from "./types/taxiTypes.ts"
import { RootState } from "../types"
import { api } from "../../api/api.ts"
import { errorSnackbar } from "../snackbar/snackbarSlice.ts"

export const getTaxis = createAsyncThunk(
  "taxi/getTaxis",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get<TaxiCar[]>("/taxi")
      return response.data
    } catch (error) {
      console.error(error)
      void dispatch(errorSnackbar("Problem podczas pobierania taksówek"))
      return rejectWithValue([])
    }
  }
)

interface TaxiState {
  loading: boolean
  taxis: TaxiCar[]
}

const initialState: TaxiState = {
  loading: false,
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
      })
      .addCase(getTaxis.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) state.taxis = action.payload
      })
      .addCase(getTaxis.rejected, (state) => {
        state.loading = false
      })
  },
})

export const taxisSelector = (state: RootState) => state.taxiReducer.taxis
export const taxisLoading = (state: RootState) => state.taxiReducer.loading
export default taxiSlice.reducer
