import { ReactNode } from "react"
import { IconButton, Drawer, Box } from "@mui/material"
import StartIcon from "@mui/icons-material/Start"

type OverlayDrawerProps = {
  minWidth: number | string
  open: boolean
  onClose: () => void
  children: ReactNode
}

const OverlayDrawer = ({
  minWidth = 200,
  open,
  onClose,
  children,
}: OverlayDrawerProps) => {
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      hideBackdrop
      variant="persistent"
      ModalProps={{
        keepMounted: false,
      }}
      PaperProps={{
        sx: {
          height: "calc(100% - 64px - 32px)",
          top: "auto",
          margin: 2,
          borderRadius: 2,
        },
      }}
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
