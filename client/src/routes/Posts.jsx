import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ReactMapboxGl, { Layer, Marker } from "react-mapbox-gl";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  LinearProgress,
  Button,
  Paper,
  Avatar,
  Grid,
  Stack,
} from "@mui/material";

import { formatDuration } from "../utility";

// favorite icon
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
// share icon
import ShareIcon from "@mui/icons-material/Share";

const Map = ReactMapboxGl({
  attributionControl: false,
  accessToken:
    "pk.eyJ1IjoibmxhaGEiLCJhIjoiY2s2YnR3aTViMTVkODNqbGpvcmQ4cXNkNSJ9.tv42gtwJFcNy3sjYxrPopg",
});

class PostCard extends Component {
  state = {
    author: this.props.author,
    contents: this.props.contents,
    likeStatus: 0,
    deleted: false,
  };

  handleLike = () => {
    let likeStatusNew = !this.state.likeStatus;
    this.setState({ likeStatus: likeStatusNew });
    // make post request to server
    fetch(process.env.REACT_APP_API_ENDPOINT + "/posts/changelike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: this.state.contents.post_id,
        change_like: likeStatusNew,
      }),
    });

    // update like count
    this.setState({
      contents: {
        ...this.state.contents,
        likes: this.state.contents.likes + (likeStatusNew ? 1 : -1),
      },
    });
  };

  handleDelete = () => {
    // make post request to server
    fetch(process.env.REACT_APP_API_ENDPOINT + "/posts/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: this.state.contents.post_id,
      }),
    });

    // deleted
    this.setState({
      deleted: true,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.deleted == false ? (
          <Card variant="outlined" className="secondary-card top-margin">
            <CardContent>
              <Typography variant="h5" component="h2">
                Assignment: <b>{this.state.contents.title}</b>
              </Typography>
              <Typography variant="h5" component="h2">
                Class: <b>{this.state.contents.class}</b>
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
              <Stack spacing={2} direction="row" alignItems="center">
                <SentimentSatisfiedAltIcon />
                <LinearProgress
                  className="difficulty-meter"
                  size={40}
                  thickness={4}
                  variant="determinate"
                  value={this.state.contents.difficulty}
                  sx={{ minWidth: "50vw" }}
                />
                <SentimentVeryDissatisfiedIcon />
              </Stack>
              <Typography variant="h6" component="h5">
                Assignment Duration:
              </Typography>
              <Typography variant="p" component="p">
                {formatDuration(this.state.contents.timeStudying)}
              </Typography>
              {this.state.contents.coordinates &&
              this.state.contents.coordinates[0] != 0 &&
              this.state.contents.coordinates[1] != 0 &&
              this.state.contents.coordinates[0] != null &&
              this.state.contents.coordinates[1] != null ? (
                <Paper className="padding-margin map" variant="outlined">
                  <Map
                    style="mapbox://styles/mapbox/dark-v9"
                    containerStyle={{
                      height: "180px",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                    center={[
                      this.props.contents.coordinates[1],
                      this.props.contents.coordinates[0],
                    ]}
                  >
                    <Layer
                      type="symbol"
                      id="marker"
                      layout={{ "icon-image": "marker-15" }}
                    >
                      <Marker
                        coordinates={[
                          this.props.contents.coordinates[1],
                          this.props.contents.coordinates[0],
                        ]}
                        anchor="bottom"
                      >
                        {this.state.author ? (
                          <Avatar
                            alt={this.state.author.firstName}
                            src={this.state.author.google.profilePic}
                          />
                        ) : (
                          // text avatar
                          <Avatar>{this.state.contents.title.charAt(0)}</Avatar>
                        )}
                      </Marker>
                    </Layer>
                  </Map>
                </Paper>
              ) : (
                <React.Fragment></React.Fragment>
              )}
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
                          {this.state.author.firstName}{" "}
                          {this.state.author.lastName}
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
              <IconButton
                className={this.state.likeStatus ? "liked" : ""}
                aria-label="like"
                onClick={this.handleLike}
              >
                <FavoriteIcon />
              </IconButton>
              <Typography variant="h6" component="h5">
                {this.state.contents.likes}
              </Typography>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              {this.props.owned ? (
                <IconButton aria-label="delete" onClick={this.handleDelete}>
                  <DeleteForeverIcon />
                </IconButton>
              ) : (
                ""
              )}
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Grid item xs>
                  <Typography className="align-right soft-text">
                    Posted:{" "}
                    {new Date(this.state.contents.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    );
  }
}

export default PostCard;
