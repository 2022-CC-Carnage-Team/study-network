import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

class SNAppBar extends Component {
  state = {};

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="app-bar-container">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              WSU Student Network
            </Typography>
            <a
              className="no-link-style"
              href={process.env.REACT_APP_API_ENDPOINT + "/auth/google"}
            >
              <Button color="inherit">Login</Button>
            </a>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export { SNAppBar };
