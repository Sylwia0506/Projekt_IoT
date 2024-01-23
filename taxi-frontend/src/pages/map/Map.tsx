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
  Tooltip,
  Typography,
} from "@mui/material"
import BlockIcon from "@mui/icons-material/Block"
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi"
import RefreshIcon from "@mui/icons-material/Refresh"
import MapTaxi from "../../components/taxi/MapTaxi"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import {
  getMapData,
  mapDisconnected,
  mapSelector,
  reconnect,
} from "../../store/map/mapSlice"
import { MapCar } from "../../store/map/types/mapTypes"
import { useLocation } from "react-router-dom"

const MAP_UPDATE_INTERVAL = 1000

const Map = () => {
  const [activeTaxisOpen, setActiveTaxisOpen] = useState(false)
  const [selectedTaxi, setSelectedTaxi] = useState<MapCar | null>(null)
  const [trackTaxi, setTrackTaxi] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const mapTaxis = useAppSelector(mapSelector)
  const disconnected = useAppSelector(mapDisconnected)
  const location = useLocation()

  useEffect(() => {
    void dispatch(getMapData())
  }, [dispatch])

  useEffect(() => {
    let timer = -1

    if (!disconnected) {
      timer = setInterval(() => {
        void dispatch(getMapData())
      }, MAP_UPDATE_INTERVAL)
    }

    return () => {
      clearInterval(timer)
    }
  }, [dispatch, disconnected])

  useEffect(() => {
    location.state &&
      selectTaxi(
        mapTaxis.find((taxi) => taxi.id == location.state.focusedTaxi)!
      )
  }, [])

  const selectTaxi = (taxi: MapCar): void => {
    setSelectedTaxi(taxi)
  }

  const deselectTaxi = (): void => {
    setSelectedTaxi(null)
  }

  const startTracking = (): void => {
    if (selectedTaxi) {
      setTrackTaxi(true)
    }
  }

  const stopTracking = (): void => {
    setTrackTaxi(false)
  }

  const mapReconnect = (): void => {
    dispatch(reconnect())
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

      {disconnected && (
        <Box
          sx={{
            position: "absolute",
            bottom: "2rem",
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
            <Typography>Utracono połączenie: </Typography>

            <Tooltip title="Połącz ponownie">
              <IconButton onClick={mapReconnect}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
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
