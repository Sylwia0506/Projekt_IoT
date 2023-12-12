import { useEffect, useState } from "react"
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
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getMapData, mapSelector } from "../../store/map/mapSlice"
import { MapCar } from "../../store/map/types/mapTypes"

const MAP_UPDATE_INTERVAL = 1000

const Map = () => {
  const [activeTaxisOpen, setActiveTaxisOpen] = useState(false)
  const [selectedTaxi, setSelectedTaxi] = useState<MapCar | null>(null)
  const [trackTaxi, setTrackTaxi] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const mapTaxis = useAppSelector(mapSelector)

  useEffect(() => {
    void dispatch(getMapData())

    const timer = setInterval(() => {
      void dispatch(getMapData())
    }, MAP_UPDATE_INTERVAL)

    return () => clearInterval(timer)
  }, [dispatch])

  const selectTaxi = (taxi: MapCar) => {
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
          {mapTaxis.map((taxi) => (
            <ListItem key={taxi.id}>
              <MapTaxi
                key={taxi.id}
                taxi={taxi}
                selected={selectedTaxi?.id === taxi?.id}
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
            <Typography fontWeight="bold">{`${selectedTaxi?.registration} ${selectedTaxi?.brand} ${selectedTaxi?.model}`}</Typography>
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
        activeTaxis={mapTaxis}
        selectedTaxi={selectedTaxi}
        selectTaxi={selectTaxi}
        trackTaxi={trackTaxi}
      />
    </Box>
  )
}

export default Map
