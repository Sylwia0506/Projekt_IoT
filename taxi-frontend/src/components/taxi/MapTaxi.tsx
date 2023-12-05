import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi"
import CircleIcon from "@mui/icons-material/Circle"
import { TaxiCar } from "./testTaxis"

type MapTaxiProps = {
  taxi: TaxiCar
}

const MapTaxi = ({ taxi }: MapTaxiProps) => {
  return (
    <Card variant="outlined">
      <CardContent sx={{ padding: 1, paddingBottom: 0 }}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <LocalTaxiIcon />
              </Grid>
              <Grid item>
                <Typography component="h2" variant="h5">
                  {taxi.licensePlate}
                </Typography>
              </Grid>
              <Grid item>
                <CircleIcon color={taxi.driver !== "" ? "success" : "error"} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography component="span" variant="h6">
              {taxi.producent} {taxi.model}
            </Typography>
            <Grid container></Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography component="span" variant="h6">
              {taxi.driver ? taxi.driver : "BRAK"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button size="small">Znajdź</Button>
      </CardActions>
    </Card>
  )
}

export default MapTaxi
