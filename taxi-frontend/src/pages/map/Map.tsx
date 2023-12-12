import { FC, useState } from "react"
import LeafletMap from "../../components/map/LeafletMap"
import OverlayDrawer from "../../components/overlay-drawer/OverlayDrawer"

import {
  Fab,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material"
import BlockIcon from "@mui/icons-material/Block"
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi"
import MapTaxi from "../../components/taxi/MapTaxi"
import { TaxiCar, testTaxis } from "../../components/taxi/testTaxis"

const Map: FC = () => {
  const [activeTaxisOpen, setActiveTaxisOpen] = useState(false)
  const [selectedTaxi, setSelectedTaxi] = useState<TaxiCar | null>(null)
  const [trackTaxi, setTrackTaxi] = useState<boolean>(false)

  const selectTaxi = (taxi: TaxiCar) => {
    setSelectedTaxi(taxi)
  }

  const deselectTaxi = () => {
    setSelectedTaxi(null)
  }

  const startTracking = () => {
    if (selectedTaxi) {
      setTrackTaxi(true)
    }
  }

  const stopTracking = () => {
    setTrackTaxi(false)
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
                selected={selectedTaxi?.VIN === taxi?.VIN}
                selectTaxi={selectTaxi}
              />
            </ListItem>
          ))}
        </List>
      </OverlayDrawer>

      {selectedTaxi && (
        <Box
          sx={{
            position: "absolute",
            top: "75px",
            left: "50%",
            transform: "translate(-50%, 0)",
            zIndex: 1150,
            background: "white",
            paddingX: 2,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            gap={{ xs: 0, sm: 1 }}
          >
            <Typography>Podążanie za: </Typography>
            <Typography fontWeight="bold">{`${selectedTaxi?.licensePlate} ${selectedTaxi?.producent} ${selectedTaxi?.model}`}</Typography>
            <Button onClick={trackTaxi ? stopTracking : startTracking}>
              {trackTaxi ? "Stop" : "Podążaj za"}
            </Button>
            <IconButton onClick={deselectTaxi} aria-label="Remove selection">
              <BlockIcon />
            </IconButton>
          </Stack>
        </Box>
      )}

      <LeafletMap
        activeTaxis={testTaxis}
        selectedTaxi={selectedTaxi}
        selectTaxi={selectTaxi}
        trackTaxi={trackTaxi}
      />
    </Box>
  )
}

export default Map
