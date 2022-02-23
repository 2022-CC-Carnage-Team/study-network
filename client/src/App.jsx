import React, { useState, useEffect } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import "./Custom.css";

import { Home } from "./routes/Home";
import { Profile } from "./routes/Profile";
import NewPost from "./routes/NewPost";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SNAppBar } from "./SNAppBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SinglePost } from "./routes/SinglePost";

//import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
//import SiteLogo from "./wsusn_logo.svg";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

import { Paper, TextField, Container, Stack, Tooltip } from "@mui/material";

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
  spacing: 1,
  shape: {
    borderRadius: 10,
  },
});

function App() {
  const [user, setUser] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  let [searchField, setSearchField] = useState("");

  useEffect(() => {
    setSearchField("");

    callBackendAPI()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  // fetching the GET route from the Express server which matches the GET route from server.js
  const callBackendAPI = async () => {
    const response = await fetch(`/users/me`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  const mobile = useMediaQuery("(min-width:600px)");

  const handleSearch = (q) => {
    if (q !== "" && q !== null) {
      setSearchParams({ q });
    }
  };

  const handleSearchClear = (event) => {
    event.preventDefault();
    // remove search params
    setSearchParams({});
    setSearchField("");
  };

  return (
    <ThemeProvider theme={theme}>
      <SNAppBar user={user} />
      <div className="App">
        <Container maxWidth="lg">
          <Paper sx={{ p: "0.5rem" }}>
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            >
              <Tooltip title="Search">
                <IconButton
                  onClick={(ev) => {
                    ev.preventDefault();
                    handleSearch(searchField);
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <TextField
                value={searchField}
                onChange={(ev) => {
                  setSearchField(ev.target.value);
                }}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    // Do code here
                    ev.preventDefault();
                    handleSearch(ev.target.value);
                  }
                }}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
              <Tooltip title="Clear search">
                <IconButton onClick={handleSearchClear}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Paper>
        </Container>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="profile" element={<Profile user={user} />} />
          <Route path="profile/:userid" element={<Profile />} />
          <Route path="post" element={<NewPost user={user} />} />
          <Route path="post/:postid" element={<SinglePost />} />
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

export default App;
