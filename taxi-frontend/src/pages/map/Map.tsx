import { FC, useState } from "react"
import LeafletMap from "../../components/map/LeafletMap"
import OverlayDrawer from "../../components/overlay-drawer/OverlayDrawer"

import { Fab, Box, List, ListItem } from "@mui/material"
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi"
import MapTaxi from "../../components/taxi/MapTaxi"
import { testTaxis } from "../../components/taxi/testTaxis"

const Map: FC = () => {
  const [activeTaxisOpen, setActiveTaxisOpen] = useState(false)

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
              <MapTaxi taxi={taxi} key={taxi.VIN} />
            </ListItem>
          ))}
        </List>
      </OverlayDrawer>

      <LeafletMap activeTaxis={testTaxis} />
    </Box>
  )
}

export default Map
