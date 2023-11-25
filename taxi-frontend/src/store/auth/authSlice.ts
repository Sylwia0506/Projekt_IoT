import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
  loading: boolean
}

const initialState: AuthState = {
  loading: true,
}

const authSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default authSlice.reducer
