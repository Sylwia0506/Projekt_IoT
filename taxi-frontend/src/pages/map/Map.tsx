import { FC, useState } from "react"
import LeafletMap from "../../components/map/LeafletMap"
import OverlayDrawer from "../../components/overlay-drawer/OverlayDrawer"

import { Fab, Box, List, ListItem } from "@mui/material"
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi"

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
        minWidth={300}
        open={activeTaxisOpen}
        onClose={() => setActiveTaxisOpen(false)}
      >
        <List>
          {[1, 2, 3].map((n) => (
            <ListItem
              key={n}
              sx={{ border: "2px solid" }}
            >{`Taxi ${n}`}</ListItem>
          ))}
        </List>
      </OverlayDrawer>

      <LeafletMap />
    </Box>
  )
}

export default Map
