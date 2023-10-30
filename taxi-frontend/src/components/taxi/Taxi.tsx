import { Box, Card, CardContent, Divider, Typography } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"
import SettingsIcon from "@mui/icons-material/Settings"
import PersonIcon from "@mui/icons-material/Person"
import { FC } from "react"
import { TaxiCar } from "./testTaxis"

const Taxi: FC<{ taxiCar: TaxiCar }> = ({ taxiCar }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <CardContent sx={{ width: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            margin: "1rem 0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <CircleIcon color={taxiCar.driver !== "" ? "success" : "error"} />
            <Typography variant="h5">{taxiCar.licensePlate}</Typography>
          </Box>
          <SettingsIcon sx={{ position: "absolute", right: "1%" }} />
        </Box>
        <Typography variant="subtitle2">{taxiCar.VIN}</Typography>
        <Typography
          sx={{ display: "inline-flex", fontWeight: "bold" }}
          variant="h6"
        >
          {taxiCar.producent} {taxiCar.model}
        </Typography>
        <Typography sx={{ marginBottom: 1 }}>
          {Number(taxiCar.fuelConsumption).toFixed(1)} L
        </Typography>
        <Divider variant="middle" />
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            marginTop: 2,
            gap: 0.5,
          }}
        >
          <Typography variant="h6">
            {taxiCar.driver ? taxiCar.driver : "BRAK"}
          </Typography>
          {taxiCar.driver && <PersonIcon />}
        </Box>
      </CardContent>
    </Card>
  )
}

export default Taxi
