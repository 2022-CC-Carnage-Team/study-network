import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Menu, MenuItem } from "@mui/material";

class SNAppBar extends Component {
  state = {
    anchorEl: null,
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          color="primary"
          enableColorOnDark
          position="static"
          className="app-bar-container"
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
            {this.props.user ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button onClick={this.handleMenu} sx={{ p: 0 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    className="user-name"
                    sx={{ flexGrow: 1, padding: 2 }}
                  >
                    {this.props.user.firstName} {this.props.user.lastName}
                  </Typography>
                  <Avatar
                    alt={this.props.user.firstName}
                    src={this.props.user.google.profilePic}
                  />
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
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
                href={process.env.REACT_APP_API_ENDPOINT + "/auth/google"}
              >
                <Button color="inherit">Login</Button>
              </a>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export { SNAppBar };
