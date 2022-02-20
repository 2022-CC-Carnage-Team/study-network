import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  LinearProgress,
  Box,
  Button,
  Paper,
  Avatar,
  Grid,
  Item,
  Container,
  TextField,
  Stack,
  Slider,
} from "@mui/material";

// favorite icon
import FavoriteIcon from "@mui/icons-material/Favorite";

// share icon
import ShareIcon from "@mui/icons-material/Share";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BoltIcon from "@mui/icons-material/Bolt";

class NewPost extends Component {
  state = {
    difficulty: 0,
    title: "",
    description: "",
    class: "",
    duration: 0,
  };

  handleDiffChange = (event, newValue) => {
    this.setState({ difficulty: newValue });
  };

  handleDurChange = (event, newValue) => {
    this.setState({ duration: newValue });
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
                      Time Spent: {formatDuration(this.state.duration)}
                      <Stack
                        spacing={2}
                        direction="row"
                        sx={{ mb: 2, ml: 5, mr: 5 }}
                        alignItems="center"
                      >
                        <BoltIcon />
                        <Slider
                          aria-label="duration"
                          value={this.state.duration}
                          onChange={this.handleDurChange}
                          max={86400}
                          step={300}
                        />
                        <AccessTimeIcon />
                      </Stack>
                    </div>
                  </div>
                  <Button variant="contained" onClick={this.handleSubmit}>
                    Post
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

function formatDuration(in_secs) {
  // format to days, hours, minutes, seconds
  let days = Math.floor(in_secs / 86400);
  let hours = Math.floor((in_secs % 86400) / 3600);
  let minutes = Math.floor(((in_secs % 86400) % 3600) / 60);
  let seconds = ((in_secs % 86400) % 3600) % 60;

  let duration = "";
  if (days > 0) {
    duration += days + " days ";
  }
  if (hours > 0) {
    duration += hours + " hours ";
  }
  if (minutes > 0) {
    duration += minutes + " minutes ";
  }
  if (seconds > 0) {
    duration += seconds + " seconds ";
  }

  return duration;
}

class PostCard extends Component {
  state = {
    author: this.props.author,
    contents: this.props.contents,
  };
  render() {
    return (
      <Card variant="outlined" className="secondary-card top-margin">
        <CardContent>
          <Typography variant="h5" component="h2">
            Assignment: {this.state.contents.title}
          </Typography>
          <Typography variant="h5" component="h2">
            Class: {this.state.contents.class}
          </Typography>
          <Typography variant="h6" component="h5">
            Assignment Description:
          </Typography>
          <Typography component="p">
            {this.state.contents.description}
          </Typography>
          <Typography variant="h6" component="h5">
            Assignment Difficulty:
          </Typography>
          <LinearProgress
            className="difficulty-meter"
            size={40}
            thickness={4}
            variant="determinate"
            value={this.state.contents.difficulty}
          />
          <Typography variant="h6" component="h5">
            Assignment Duration:
          </Typography>
          <Typography variant="p" component="p">
            {formatDuration(this.state.contents.duration)}
          </Typography>
          <Paper className="padding-margin" variant="outlined">
            {this.state.author ? (
              <Grid
                container
                justifyContent="flex-start"
                direction="row"
                alignItems="center"
              >
                <Grid item xs={2}>
                  <Avatar>
                    <Avatar
                      alt={this.state.author.firstName}
                      src={this.state.author.google.profilePic}
                    />
                  </Avatar>
                </Grid>
                <Grid item xs={4}>
                  <a
                    className="no-link-style"
                    href={`mailto:${this.state.author.google.email}`}
                  >
                    <Button variant="primary">
                      {this.state.author.firstName} {this.state.author.lastName}
                    </Button>
                  </a>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="p" component="p">
                Unknown User
              </Typography>
            )}
          </Paper>
        </CardContent>
        <CardActions>
          <IconButton aria-label="like">
            <FavoriteIcon />
          </IconButton>
          <Typography variant="h6" component="h5">
            {this.state.contents.likes}
          </Typography>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Grid item xs>
              <Typography className="align-right soft-text">
                Posted: {new Date(this.state.contents.createdAt).toDateString()}
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
  }
}

export { NewPost, PostCard };
