import { Box, Grid, Pagination } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { testTaxis } from "../../components/taxi/testTaxis"
import Taxi from "../../components/taxi/Taxi"
import Searchbar from "../../components/searchbar/Searchbar"

const Taxis: FC = () => {
  const [taxis, setTaxis] = useState(testTaxis)
  const [pageCount, setPageCount] = useState(1)
  const [searchInput, setSearchInput] = useState("")

  function onSeachbarInput() {}

  useEffect(() => {
    setPageCount(Math.floor(taxis.length / 12) + 1)
  }, [taxis])

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
      <Searchbar label="Wyszukaj taksówkę" />
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
          {testTaxis.map((taxiCar, index) => (
            <Grid item xs={4} lg={6} key={index}>
              <Taxi taxiCar={taxiCar}></Taxi>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Pagination count={pageCount} color="primary" />
    </Box>
  )
}

export default Taxis
