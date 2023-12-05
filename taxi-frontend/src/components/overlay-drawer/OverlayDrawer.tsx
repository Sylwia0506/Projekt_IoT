import { ReactNode } from "react"
import { IconButton, Drawer, Box } from "@mui/material"
import StartIcon from "@mui/icons-material/Start"
import { useTheme } from "@mui/material/styles"

type OverlayDrawerProps = {
  width: number | string
  open: boolean
  onClose: () => void
  children: ReactNode
}

const OverlayDrawer = ({
  width = 200,
  open,
  onClose,
  children,
}: OverlayDrawerProps) => {
  const theme = useTheme()

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
      <Box
        sx={{
          width: width,
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            background: theme.palette.background.paper,
            position: "sticky",
            top: 0,
            boxShadow: theme.shadows[3],
            zIndex: 1250,
          }}
        >
          <IconButton onClick={onClose} sx={{ margin: 1 }}>
            <StartIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Drawer>
  )
}

export default OverlayDrawer
