import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { initUserDto, UserDto } from "./types/authTypes.ts"
import { errorSnackbar } from "../snackbar/snackbarSlice.ts"

interface AuthState {
  loading: boolean
  currentUser: UserDto
}

const initialState: AuthState = {
  loading: true,
  currentUser: initUserDto,
}

export const getUser = createAsyncThunk(
  "/auth/get",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      return initUserDto
    } catch (error) {
      dispatch(errorSnackbar("Problem podczas pobierania użytnownika"))
      return rejectWithValue(initUserDto)
    }
  }
)

const authSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.loading = false
      })
      .addMatcher(isAnyOf(getUser.rejected), (state) => {
        state.loading = false
      })
      .addMatcher(isAnyOf(getUser.pending), (state) => {
        state.loading = true
      }),
})

export default authSlice.reducer
