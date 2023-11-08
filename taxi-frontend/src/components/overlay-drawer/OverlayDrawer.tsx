import { ReactElement, ReactNode } from "react"
import { IconButton, Drawer, Box, SwipeableDrawer } from "@mui/material"
import StartIcon from "@mui/icons-material/Start"

type OverlayDrawerProps = {
  minWidth: number | string
  open: boolean
  onOpen: () => void
  onClose: () => void
  // children: ReactElement
  children: ReactNode
}

const OverlayDrawer = ({
  minWidth = 200,
  open,
  onOpen,
  onClose,
  children,
}: OverlayDrawerProps) => {
  return (
    // <SwipeableDrawer
    <Drawer
      anchor={"right"}
      open={open}
      // onOpen={onOpen}
      onClose={onClose}
      hideBackdrop
      variant="persistent"
      ModalProps={{
        keepMounted: false,
      }}
      PaperProps={{ sx: { top: "auto" } }}
    >
      <Box sx={{ minWidth: minWidth }}>
        <IconButton onClick={onClose} sx={{ margin: 1 }}>
          <StartIcon />
        </IconButton>

        {children}
      </Box>
    </Drawer>
  )
}

export default OverlayDrawer
