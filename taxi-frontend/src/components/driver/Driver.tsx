import { Box, Card, CardContent, Divider, Typography } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import { FC } from "react"
import { Driver } from "./mockDrivers"

const DriverCard: FC<{ driver: Driver }> = ({ driver }) => {
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
            <Typography variant="h6">
              {driver.firstName} {driver.lastName}
            </Typography>
          </Box>
          <SettingsIcon sx={{ position: "absolute", right: "1%" }} />
        </Box>
        <Box>
          <Typography variant="subtitle2">
            {driver.dateOfBirth.toLocaleDateString()}
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            marginTop: 2,
            gap: 0.5,
          }}
        >
          <Typography variant="h6">{driver.gender}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default DriverCard
