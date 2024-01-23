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
import AppConstants from "../../constants/appConstants.ts"

const Taxis: FC = () => {
  const dispatch = useAppDispatch()
  const taxis: TaxiCar[] = useAppSelector(taxisSelector)
  const loading: boolean = useAppSelector(taxisLoading)
  const [shownTaxis, setShownTaxis] = useState<TaxiCar[]>([])
  const [pageCount, setPageCount] = useState(1)

  const handlePageChange = (value: number): void => {
    const index: number = (value - 1) * AppConstants.pageSize
    setShownTaxis(taxis.slice(index, index + AppConstants.pageSize))
  }

  useEffect((): void => {
    void dispatch(getTaxis())
  }, [dispatch])

  useEffect((): void => {
    if (taxis) {
      setPageCount(Math.ceil(taxis.length / AppConstants.pageSize))
      setShownTaxis(taxis.slice(0, AppConstants.pageSize))
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
        height: 1,
        background: "white",
        justifyContent: "start",
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
        sx={{ marginTop: "auto", marginBottom: 4 }}
        count={pageCount}
        color="primary"
        onChange={(_, page) => handlePageChange(page)}
      />
    </Box>
  )
}

export default Taxis
