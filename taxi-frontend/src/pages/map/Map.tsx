import { FC, useState } from "react"
import LeafletMap from "../../components/map/LeafletMap"
import OverlayDrawer from "../../components/overlay-drawer/OverlayDrawer"

import { Fab, Box, List, ListItem, Typography } from "@mui/material"
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi"
import MapTaxi from "../../components/taxi/MapTaxi"
import { TaxiCar, testTaxis } from "../../components/taxi/testTaxis"

const Map: FC = () => {
  const [activeTaxisOpen, setActiveTaxisOpen] = useState(false)
  const [selectedTaxi, setSelectedTaxi] = useState<TaxiCar | null>(null)

  const selectTaxi = (taxi: TaxiCar) => {
    console.log("select", taxi)
    setSelectedTaxi(taxi)
  }

  return (
    <Box
      sx={{
        height: "100%",
        position: "relative",
      }}
    >
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setActiveTaxisOpen(true)}
        sx={{ position: "absolute", top: 16, right: 16 }}
      >
        <LocalTaxiIcon />
      </Fab>

      <OverlayDrawer
        width={300}
        open={activeTaxisOpen}
        onClose={() => setActiveTaxisOpen(false)}
      >
        <List>
          {testTaxis.map((taxi) => (
            <ListItem key={taxi.VIN}>
              <MapTaxi
                key={taxi.VIN}
                taxi={taxi}
                selected={selectedTaxi === taxi}
                selectTaxi={selectTaxi}
              />
            </ListItem>
          ))}
        </List>
      </OverlayDrawer>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 1500,
          background: "white",
        }}
      >
        <Typography>{`Selected taxi: ${selectedTaxi?.VIN} ${selectedTaxi?.producent} ${selectedTaxi?.model}`}</Typography>
      </Box>

      <LeafletMap activeTaxis={testTaxis} selectedTaxi={selectedTaxi} />
    </Box>
  )
}

export default Map
