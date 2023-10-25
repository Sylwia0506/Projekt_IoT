import { FC } from "react"
import LeafletMap from "../../components/map/LeafletMap"
import Grid from "@mui/material/Grid/Grid"

const Map: FC = () => {
  return (
    <Grid container height={"100%"}>
      <Grid item xs={12}>
        <LeafletMap />
      </Grid>
    </Grid>
  )
}

export default Map
