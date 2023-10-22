import "./App.css"
import Navigation from "./components/navigation/Navigation.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Link } from "./components/navigation/navigationTabs.ts"
import { Drivers, Home, Map, Taxi } from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path={Link.HOME} element={<Home />} />
        <Route path={Link.TAXI} element={<Taxi />} />
        <Route path={Link.MAP} element={<Map />} />
        <Route path={Link.DRIVERS} element={<Drivers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
