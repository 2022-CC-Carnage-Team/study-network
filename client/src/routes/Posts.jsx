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
} from "@mui/material";

// favorite icon
import FavoriteIcon from "@mui/icons-material/Favorite";

// share icon
import ShareIcon from "@mui/icons-material/Share";

class NewPost extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1>New Post</h1>
      </div>
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
    contents: {
      title: "Example Title",
      class: "Example Class",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nisi tincidunt nisi, eget consectetur erat nisi euismod nisi. Sed euismod, nisi vel consectetur interdum, nisl nisi tincidunt nisi, eget consectetur erat nisi euismod nisi. Sed euismod, nisi vel consectetur interdum, nisl nisi tincidunt nisi, eget consectetur erat nisi euismod nisi. Sed euismod, nisi vel consectetur interdum, nisl.",
      difficulty: 37,
      duration: 2334, // seconds
    },
  };

  render() {
    return (
      <Card variant="outlined" className="secondary-card">
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
          </Paper>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="like">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export { NewPost, PostCard };
