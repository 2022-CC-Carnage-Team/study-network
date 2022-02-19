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
    allVariants: {
      color: "white",
    },
  },
  palette: {
    type: "dark",
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
  render() {
    return (
      <ThemeProvider theme={theme}>
        <SNAppBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="post" element={<NewPost />} />
          </Routes>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
