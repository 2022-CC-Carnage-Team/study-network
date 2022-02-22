import React, { useState, useEffect } from "react";
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";

function NewPost(props) {
  const [difficulty, setDifficulty] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [className, setClassName] = useState("");
  const [timeStudying, setTimeStudying] = useState(0);
  const [success, setSuccess] = useState(false);
  const [postType, setPostType] = useState("");

  const handleDiffChange = (event, newValue) => {
    setDifficulty(newValue);
  };

  const handleDurChange = (event, newValue) => {
    setTimeStudying(newValue);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClassChange = (event) => {
    setClassName(event.target.value);
  };

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
  };

  const handleSubmit = (event, newValue) => {
    event.preventDefault();

    if (title == "" || description == "" || className == "" || postType == "") {
      alert("Please fill out all fields");
      return;
    }

    // make post request to server
    fetch("/posts/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        difficulty: difficulty,
        title: title,
        description: description,
        class: className,
        timeStudying: timeStudying,
        postType: postType,
      }),
    });

    setSuccess(true);
  };

  const handleSubmitLoc = (event, newValue) => {
    event.preventDefault();

    if (title == "" || description == "" || className == "") {
      alert("Please fill out all fields");
      return;
    }

    if (!props.isGeolocationAvailable) {
      alert("Your browser does not support Geolocation");
    }

    if (!props.isGeolocationEnabled) {
      alert("Geolocation is not enabled");
    }

    let coords = [];
    if (props.coords) {
      coords = [props.coords.latitude, props.coords.longitude];
    }

    // make post request to server
    fetch("/posts/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        difficulty: difficulty,
        title: title,
        description: description,
        class: className,
        timeStudying: timeStudying,
        coordinates: coords,
      }),
    });

    setSuccess(true);
  };

  return (
    <Container maxWidth="lg">
      <Paper className="page-container">
        <Typography variant="h4" component="h4">
          New Post
        </Typography>
        {success == false ? (
          props.user ? (
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
                  <FormControl fullWidth>
                    <InputLabel id="post-type-select-label">Type</InputLabel>
                    <Select
                      labelId="post-type-select-label"
                      id="post-type-select"
                      value={postType}
                      label="Age"
                      onChange={handlePostTypeChange}
                    >
                      <MenuItem value={"assignment"}>Assignment</MenuItem>
                      <MenuItem value={"exam"}>Exam</MenuItem>
                      <MenuItem value={"other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Title"
                      value={title}
                      onChange={handleTitleChange}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Class"
                      value={className}
                      onChange={handleClassChange}
                    />
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-required"
                      label="Description"
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                    <div>
                      Difficulty: {`${difficulty}%/100%`}
                      <Stack
                        spacing={2}
                        direction="row"
                        sx={{ mb: 2, ml: 5, mr: 5 }}
                        alignItems="center"
                      >
                        <SentimentSatisfiedAltIcon />
                        <Slider
                          aria-label="difficulty"
                          value={difficulty}
                          onChange={handleDiffChange}
                        />
                        <SentimentVeryDissatisfiedIcon />
                      </Stack>
                      Time Spent: {formatDuration(timeStudying)}
                      <Stack
                        spacing={2}
                        direction="row"
                        sx={{ mb: 2, ml: 5, mr: 5 }}
                        alignItems="center"
                      >
                        <BoltIcon />
                        <Slider
                          aria-label="timeStudying"
                          value={timeStudying}
                          onChange={handleDurChange}
                          max={86400}
                          step={300}
                        />
                        <AccessTimeIcon />
                      </Stack>
                    </div>
                  </div>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={3}
                  >
                    <Grid item>
                      <Button variant="contained" onClick={handleSubmit}>
                        Post
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmitLoc}
                      >
                        Post With Location
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <div>
              <Typography variant="h6" component="div">
                Please{" "}
                <a
                  href={`${process.env.REACT_APP_API_ENDPOINT}/auth/microsoft`}
                >
                  login
                </a>{" "}
                to post
              </Typography>
            </div>
          )
        ) : (
          <div>
            <Typography variant="h6" component="div">
              Post Successful!
            </Typography>
            <Link to="/" class="no-link-style">
              <Button variant="contained" color="primary">
                Back to Home
              </Button>
            </Link>
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(NewPost);
