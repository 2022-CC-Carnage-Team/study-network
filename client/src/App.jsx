import React, { Component } from "react";
// use state
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Custom.css";

import { Home } from "./routes/Home";
import { Profile } from "./routes/Profile";
import NewPost from "./routes/NewPost";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { SNAppBar } from "./SNAppBar";

export const theme = createTheme({
  typography: {
    fontFamily: "Fira Sans",
    allVariants: {
      color: "white",
    },
    button: {
      fontSize: "1.2rem",
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#A60F2D",
    },
    secondary: {
      main: "#CACACA",
    },
    background: {
      default: "#111111",
      paper: "#111111",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 10,
  },
});

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ user: res.user }))
      .catch((err) => console.log(err));
  }

  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch(`/users/me`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <SNAppBar user={this.state.user} />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home user={this.state.user} />} />
            <Route
              path="profile"
              element={<Profile user={this.state.user} />}
            />
            <Route path="post" element={<NewPost user={this.state.user} />} />
          </Routes>
        </div>
        <footer className="footer">
          <p className="copyright">
            Copyright © {new Date().getFullYear()} Team Carnage
          </p>
        </footer>
      </ThemeProvider>
    );
  }
}

export default App;
