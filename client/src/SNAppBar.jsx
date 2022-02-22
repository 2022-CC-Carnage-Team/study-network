import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useSearchParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Menu, MenuItem, Stack } from "@mui/material";

import { theme } from "./App";

function SNAppBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        color="primary"
        enableColorOnDark
        position="static"
        className="app-bar-container"
        position="fixed"
      >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            className="site-title"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link to="/" className="no-link-style">
              Coug Study Network
            </Link>
          </Typography>
          {props.user ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button onClick={handleMenu} sx={{ p: 0 }}>
                <Typography
                  variant="h6"
                  component="div"
                  className="user-name"
                  sx={{ flexGrow: 1, padding: 2 }}
                >
                  {props.user.firstName} {props.user.lastName}
                </Typography>
                <Avatar
                  alt={props.user.firstName}
                  src={props.user.microsoft.profilePic}
                />
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/profile" className="no-link-style">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <a
                  href={`${process.env.REACT_APP_API_ENDPOINT}/users/logout`}
                  className="no-link-style"
                >
                  <MenuItem>Logout</MenuItem>
                </a>
              </Menu>
            </Box>
          ) : (
            <a
              className="no-link-style"
              href={`${process.env.REACT_APP_API_ENDPOINT}/auth/microsoft`}
            >
              <Button color="inherit">Login</Button>
            </a>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export { SNAppBar };
