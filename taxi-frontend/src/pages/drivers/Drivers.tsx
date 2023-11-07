import { Box, Grid, Pagination } from "@mui/material"
import { FC, useEffect, useState } from "react"
import Searchbar from "../../components/searchbar/Searchbar"
import { mockDrivers } from "../../components/driver/mockDrivers"
import DriverCard from "../../components/driver/Driver"

const Drivers: FC = () => {
  const [drivers, setDrivers] = useState(mockDrivers)
  const [pageCount, setPageCount] = useState(1)
  const [searchInput, setSearchInput] = useState("")

  function onSeachbarInput() {}

  useEffect(() => {
    setPageCount(Math.floor(drivers.length / 12) + 1)
  }, [drivers])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Searchbar label="Wyszukaj kierowce" />
      <Box
        sx={{
          width: 0.8,
          margin: "0 auto 1rem auto",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 24 }}
        >
          {drivers.map((driver, index) => (
            <Grid item xs={4} lg={6} key={index}>
              <DriverCard driver={driver}></DriverCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Pagination count={pageCount} color="primary" />
    </Box>
  )
}

export default Drivers
