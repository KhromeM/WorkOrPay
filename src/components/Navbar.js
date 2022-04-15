import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Section from "./Section";
import { Link } from "./../util/router";
import { useAuth } from "./../util/auth";
import { useDarkMode } from "./../util/theme";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 28,
    marginRight: theme.spacing(2),
  },
  drawerList: {
    width: 250,
  },
  spacer: {
    flexGrow: 1,
  },
}));
const pages = ["Products", "Pricing", "FAQ"];

function Navbar(props) {
  const classes = useStyles();

  const auth = useAuth();
  const darkMode = useDarkMode();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuState, setMenuState] = useState(null);

  // Use inverted logo if specified
  // and we are in dark mode
  const logo =
    props.logoInverted && darkMode.value ? props.logoInverted : props.logo;

  const handleOpenMenu = (event, id) => {
    // Store clicked element (to anchor the menu to)
    // and the menu id so we can tell which menu is open.
    setMenuState({ anchor: event.currentTarget, id });
  };

  const handleCloseMenu = () => {
    setMenuState(null);
  };

  return (
    <Section bgColor={props.color} size="auto">
      <AppBar position="static" color="transparent" elevation={0}>
        <Container disableGutters={true}>
          <Toolbar>
            <Link to="/">
              <Box
                style={{ height: "64px", marginTop: "0px", paddingTop: "16px" }}
              >
                <img
                  src={logo}
                  width="300px"
                  alt="Logo"
                  className={classes.logo}
                />
              </Box>{" "}
            </Link>

            <Box
              sx={{
                marginLeft: "16px",
                marginBottom: "5px",
                display: { xs: "none", bsm: "flex" },
              }}
            >
              <MenuItem component={Link} to="/">
                <Typography textalign="center">Home</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/dashboard">
                <Typography textalign="center">Products</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/pricing">
                <Typography textalign="center">Pricing</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/faq">
                <Typography textalign="center">FAQ</Typography>
              </MenuItem>
            </Box>
            <div className={classes.spacer} />

            <Hidden xlUp={true} implementation="css">
              <IconButton
                style={{ marginBottom: "8px" }}
                onClick={() => {
                  setDrawerOpen(true);
                }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden xsDown={true} implementation="css">
              {!auth.user && (
                <Button
                  style={{ marginBottom: "6px" }}
                  component={Link}
                  to="/auth/signin"
                  color="inherit"
                >
                  Sign in
                </Button>
              )}

              {auth.user && (
                <>
                  <Button
                    style={{ marginBottom: "5px" }}
                    color="inherit"
                    aria-label="Account"
                    aria-controls="account-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      handleOpenMenu(event, "account-menu");
                    }}
                  >
                    Account
                    <ExpandMoreIcon className={classes.buttonIcon} />
                  </Button>
                  <Menu
                    id="account-menu"
                    open={
                      menuState && menuState.id === "account-menu"
                        ? true
                        : false
                    }
                    anchorEl={menuState && menuState.anchor}
                    getContentAnchorEl={undefined}
                    onClick={handleCloseMenu}
                    onClose={handleCloseMenu}
                    keepMounted={true}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <MenuItem component={Link} to="/dashboard">
                      Dashboard
                    </MenuItem>
                    <MenuItem component={Link} to="/settings/general">
                      Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={(event) => {
                        auth.signout();
                      }}
                    >
                      Signout
                    </MenuItem>
                  </Menu>
                </>
              )}

              <IconButton
                color="inherit"
                onClick={darkMode.toggle}
                style={{ opacity: 0.6, marginBottom: "8px" }}
              >
                {darkMode.value && <NightsStayIcon />}

                {!darkMode.value && <WbSunnyIcon />}
              </IconButton>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List
          className={classes.drawerList}
          onClick={() => setDrawerOpen(false)}
        >
          {!auth.user && (
            <>
              <ListItem component={Link} to="/" button={true}>
                <ListItemText>Home</ListItemText>
              </ListItem>
              <ListItem component={Link} to="/auth/signin" button={true}>
                <ListItemText>Sign in</ListItemText>
              </ListItem>
              <ListItem component={Link} to="/dashboard" button={true}>
                <ListItemText>Products</ListItemText>
              </ListItem>
              <ListItem component={Link} to="/pricing" button={true}>
                <ListItemText>Pricing</ListItemText>
              </ListItem>
              <ListItem component={Link} to="/faq" button={true}>
                <ListItemText>FAQ</ListItemText>
              </ListItem>
            </>
          )}

          {auth.user && (
            <>
              <ListItem component={Link} to="/" button={true}>
                <ListItemText>Home</ListItemText>
              </ListItem>
              <ListItem component={Link} to="/dashboard" button={true}>
                <ListItemText>Products</ListItemText>
              </ListItem>
              <ListItem component={Link} to="/pricing" button={true}>
                <ListItemText>Pricing</ListItemText>
              </ListItem>
              <ListItem component={Link} to="/faq" button={true}>
                <ListItemText>FAQ</ListItemText>
              </ListItem>
              <ListItem component={Link} to="/settings/general" button={true}>
                <ListItemText>Settings</ListItemText>
              </ListItem>
              <Divider />
              <ListItem
                button={true}
                onClick={(event) => {
                  auth.signout();
                }}
              >
                <ListItemText>Sign out</ListItemText>
              </ListItem>
            </>
          )}

          <ListItem>
            <IconButton
              color="inherit"
              onClick={darkMode.toggle}
              style={{ opacity: 0.6 }}
            >
              {darkMode.value && <NightsStayIcon />}

              {!darkMode.value && <WbSunnyIcon />}
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
      <Divider />
    </Section>
  );
}

export default Navbar;
