import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BoltIcon from "@mui/icons-material/Bolt";
import { geolocated } from "react-geolocated";

import { formatDuration } from "../utility";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
  Container,
  TextField,
  Stack,
  Slider,
} from "@mui/material";

class NewPost extends Component {
  state = {
    difficulty: 0,
    title: "",
    description: "",
    class: "",
    timeStudying: 0,
  };

  handleDiffChange = (event, newValue) => {
    this.setState({ difficulty: newValue });
  };

  handleDurChange = (event, newValue) => {
    this.setState({ timeStudying: newValue });
  };

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleClassChange = (event) => {
    this.setState({ class: event.target.value });
  };

  handleSubmit = (event, newValue) => {
    event.preventDefault();

    // make post request to server
    fetch(process.env.REACT_APP_API_ENDPOINT + "/posts/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        difficulty: this.state.difficulty,
        title: this.state.title,
        description: this.state.description,
        class: this.state.class,
        timeStudying: this.state.timeStudying,
      }),
    });

    this.props.history.push("/");
  };

  handleSubmitLoc = (event, newValue) => {
    event.preventDefault();

    if (!this.props.isGeolocationAvailable) {
      alert("Your browser does not support Geolocation");
    }

    if (!this.props.isGeolocationEnabled) {
      alert("Geolocation is not enabled");
    }

    let coords = [];
    if (this.props.coords) {
      coords = [this.props.coords.latitude, this.props.coords.longitude];
    }

    // make post request to server
    fetch(process.env.REACT_APP_API_ENDPOINT + "/posts/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        difficulty: this.state.difficulty,
        title: this.state.title,
        description: this.state.description,
        class: this.state.class,
        timeStudying: this.state.timeStudying,
        coordinates: coords,
      }),
    });

    this.props.history.push("/");
  };

  render() {
    return (
      <Container maxWidth="lg">
        <Paper className="page-container">
          {this.props.user ? (
            <Card variant="outlined" className="secondary-card top-margin">
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": {
                      m: 2,
                      minWidth: "90%",
                      textAlign: "center",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Assignment/Post Title"
                      value={this.state.title}
                      onChange={this.handleTitleChange}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Class"
                      value={this.state.class}
                      onChange={this.handleClassChange}
                    />
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-required"
                      label="Assignment Description"
                      value={this.state.description}
                      onChange={this.handleDescriptionChange}
                    />
                    <div>
                      Difficulty: {`${this.state.difficulty}%/100%`}
                      <Stack
                        spacing={2}
                        direction="row"
                        sx={{ mb: 2, ml: 5, mr: 5 }}
                        alignItems="center"
                      >
                        <SentimentSatisfiedAltIcon />
                        <Slider
                          aria-label="difficulty"
                          value={this.state.difficulty}
                          onChange={this.handleDiffChange}
                        />
                        <SentimentVeryDissatisfiedIcon />
                      </Stack>
                      Time Spent: {formatDuration(this.state.timeStudying)}
                      <Stack
                        spacing={2}
                        direction="row"
                        sx={{ mb: 2, ml: 5, mr: 5 }}
                        alignItems="center"
                      >
                        <BoltIcon />
                        <Slider
                          aria-label="timeStudying"
                          value={this.state.timeStudying}
                          onChange={this.handleDurChange}
                          max={86400}
                          step={300}
                        />
                        <AccessTimeIcon />
                      </Stack>
                    </div>
                  </div>
                  <Button
                    sx={{ mr: 2 }}
                    variant="contained"
                    onClick={this.handleSubmit}
                  >
                    Post
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleSubmitLoc}
                  >
                    Post With Location
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <div>
              <Typography variant="h6" component="div">
                Please{" "}
                <a href={process.env.REACT_APP_API_ENDPOINT + "/auth/google"}>
                  login
                </a>{" "}
                to post
              </Typography>
            </div>
          )}
        </Paper>
      </Container>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(NewPost);
