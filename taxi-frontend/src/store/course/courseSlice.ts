import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { CourseBody } from "./types/courseTypes.ts"
import { RootState } from "../types"
import { api } from "../../api/api.ts"
import { errorSnackbar } from "../snackbar/snackbarSlice.ts"

export const getCourses = createAsyncThunk(
  "course/getCourses",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get<CourseBody[]>("/course")
      return response.data
    } catch (error) {
      console.error(error)
      void dispatch(errorSnackbar("Problem podczas pobierania kursów"))
      return rejectWithValue([])
    }
  }
)

interface CourseState {
  loading: boolean
  courses: CourseBody[]
}

const initialState: CourseState = {
  loading: false,
  courses: [],
}

const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.loading = true
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) state.courses = action.payload
      })
      .addCase(getCourses.rejected, (state) => {
        state.loading = false
      })
  },
})

export const courseSelector = (state: RootState) => state.courseReducer.courses
export const courseLoading = (state: RootState) => state.courseReducer.loading
export default courseSlice.reducer
