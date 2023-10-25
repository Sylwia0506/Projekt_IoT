import { FC } from "react"
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { navigationTabs } from "./navigationTabs.ts"
import { Link } from "react-router-dom"
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
          {navigationTabs.map(({ name, link }) => (
            <Button key={name} component={Link} to={link} color="inherit">
              {name}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  )
}

export default Navigation
