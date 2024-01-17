import * as React from "react";
import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { navigationTabs } from "./navigationTabs.ts";
import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
const Offset = styled("div")(({ theme }) => (theme.mixins as any).toolbar)

const Navigation: FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", paddingTop: "20px" }}>
      <Typography variant="h6"
        component={Link}
        to="/"
        sx={{
          fontWeight: 700,
          letterSpacing: ".3rem",
          textDecoration: "none",
          color: "inherit",
        }}>
        TAXI
      </Typography>
      <List>
        {navigationTabs.map(({ name, link }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} component={Link} to={link} color="inherit">
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", color: "inherit", textDecoration: "none" }}>
              <img src="/src/assets/logo/taxi_icon.png" alt="Logo" style={{ marginRight: "8px", height: "60px" }} />
              <Typography variant="h6" component="div"
                sx={{
                  mr: 2,
                  display: "flex",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  textDecoration: "none",
                  color: "inherit",
                }}>
                TAXI
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex", flexGrow: 1, justifyContent: "flex-end" } }}>
            {navigationTabs.map(({ name, link }) => (
              <Button key={name} component={Link} to={link} color="inherit">
                {name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Offset />
    </Box>
  );
};

export default Navigation;
