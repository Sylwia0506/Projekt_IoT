import { Box, Card, CardContent, Typography } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"
import SettingsIcon from "@mui/icons-material/Settings"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { FC } from "react"
import { TaxiCar } from "../../store/taxis/types/taxiTypes"
import { useNavigate } from "react-router-dom"

const Taxi: FC<{ taxiCar: TaxiCar }> = ({ taxiCar }) => {
  const navigate = useNavigate()

  const focusTaxiOnMap = (taxiId: string) => {
    navigate("/map", {
      state: {
        focusedTaxi: taxiId,
      },
    })
  }
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
            margin: "1.5rem 0",
          }}
        >
          {taxiCar.isAvailable && (
            <VisibilityIcon
              onClick={() => focusTaxiOnMap(taxiCar.id)}
              sx={{ position: "absolute", left: "1%" }}
            />
          )}
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
            <CircleIcon color={taxiCar.isAvailable ? "success" : "error"} />
            <Typography variant="h5">{taxiCar.registration}</Typography>
          </Box>
          <SettingsIcon sx={{ position: "absolute", right: "1%" }} />
        </Box>
        <Typography sx={{ marginTop: 2 }} variant="subtitle2">
          {taxiCar.vinNumber}
        </Typography>
        <Typography
          sx={{ display: "inline-flex", fontWeight: "bold" }}
          variant="h6"
        >
          {taxiCar.brand} {taxiCar.model}
        </Typography>
        <Typography>
          {Number(
            taxiCar.fuelConsumption ? taxiCar.fuelConsumption : 1
          ).toFixed(1)}{" "}
          L
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Taxi
