import { FC } from "react"
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Link, navigationTabs } from "./navigationTabs.ts"
import { Link as RouterLink } from "react-router-dom"
import { styled } from "@mui/material"

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar)

const Navigation: FC = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Taxi</Typography>
          <Stack justifyContent="space-between" width="100%" direction="row">
            <Stack direction="row">
              {navigationTabs.map(({ name, link }) => (
                <Button
                  key={name}
                  component={RouterLink}
                  to={link}
                  color="inherit"
                >
                  {name}
                </Button>
              ))}
            </Stack>
            <IconButton component={RouterLink} to={Link.PROFILE}>
              <Avatar />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  )
}

export default Navigation
