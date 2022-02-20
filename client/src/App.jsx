import React, { Component } from "react";
// use state
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Custom.css";

import { Home } from "./routes/Home";
import { Profile } from "./routes/Profile";
import { NewPost } from "./routes/Posts";

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
      main: "#CA1237",
    },
    background: {
      default: "#212121",
      paper: "#212121",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 10,
  },
});

class App extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ data: res.user }))
      .catch((err) => console.log(err));
  }

  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/users/me`
    );
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <SNAppBar user={this.state.data} />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home user={this.state.data} />} />
            <Route
              path="profile"
              element={<Profile user={this.state.data} />}
            />
            <Route path="post" element={<NewPost user={this.state.data} />} />
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
