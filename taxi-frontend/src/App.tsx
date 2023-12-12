import "./App.css"
import Navigation from "./components/navigation/Navigation.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Link } from "./components/navigation/navigationTabs.ts"
import { Drivers, Home, Map, Taxi, Courses } from "./pages"
import { Box } from "@mui/material"
import LoadingWrapper from "./components/LoadingWrapper/LoadingWrapper.tsx"
import { useAppDispatch, useAppSelector } from "./store/hooks.ts"
import { useEffect } from "react"
import { getUser } from "./store/auth/authSlice.ts"

function App() {
  const dispatch = useAppDispatch()

  const { loading } = useAppSelector((state) => state.authReducer)

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <LoadingWrapper loading={loading}>
      <BrowserRouter>
        <Navigation />
        <Box flexGrow={1}>
          <Routes>
            <Route path={Link.HOME} element={<Home />} />
            <Route path={Link.TAXI} element={<Taxi />} />
            <Route path={Link.MAP} element={<Map />} />
            <Route path={Link.DRIVERS} element={<Drivers />} />
            <Route path={Link.COURSES} element={<Courses />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </LoadingWrapper>
  )
}

export default App
