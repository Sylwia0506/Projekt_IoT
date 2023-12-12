import { Box, Grid, Pagination } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import Taxi from "../../components/taxi/Taxi"
import Searchbar from "../../components/searchbar/Searchbar"
import {
  getTaxis,
  taxisSelector,
  taxisLoading,
} from "../../store/taxis/taxiSlice"
import { TaxiCar } from "../../store/taxis/types/taxiTypes"

const Taxis: FC = () => {
  const PAGE_SIZE = 12
  const dispatch = useAppDispatch()
  const taxis = useAppSelector(taxisSelector)
  const loading = useAppSelector(taxisLoading)
  const [shownTaxis, setShownTaxis] = useState<TaxiCar[]>([])
  const [pageCount, setPageCount] = useState(1)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const index = (value - 1) * PAGE_SIZE
    setShownTaxis(taxis.slice(index, index + PAGE_SIZE))
  }

  useEffect(() => {
    void dispatch(getTaxis())
  }, [dispatch])

  useEffect(() => {
    if (taxis) {
      setPageCount(Math.ceil(taxis.length / PAGE_SIZE))
      setShownTaxis(taxis.slice(0, PAGE_SIZE))
      console.log(shownTaxis)
    }
  }, [taxis])

  if (loading) {
    return <div>Loading...</div>
  }

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
          justifyContent="center"
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 24 }}
        >
          {shownTaxis.map((taxiCar, index) => (
            <Grid item xs={4} lg={6} key={index}>
              <Taxi taxiCar={taxiCar}></Taxi>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Pagination
        count={pageCount}
        color="primary"
        onChange={handlePageChange}
      />
    </Box>
  )
}

export default Taxis
