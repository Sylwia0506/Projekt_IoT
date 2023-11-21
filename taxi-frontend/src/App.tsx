import "./App.css"
import Navigation from "./components/navigation/Navigation.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Link } from "./components/navigation/navigationTabs.ts"
import { Drivers, Home, Map, Profile, Taxi } from "./pages"
import { Box } from "@mui/material"

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Box flexGrow={1}>
        <Routes>
          <Route path={Link.HOME} element={<Home />} />
          <Route path={Link.TAXI} element={<Taxi />} />
          <Route path={Link.MAP} element={<Map />} />
          <Route path={Link.DRIVERS} element={<Drivers />} />
          <Route path={Link.PROFILE} element={<Profile />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
