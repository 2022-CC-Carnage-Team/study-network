import React, { useState, useEffect } from "react";
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
  Tooltip,
} from "@mui/material";

import { formatDuration } from "../utility";

// icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import ShareIcon from "@mui/icons-material/Share";

const Map = ReactMapboxGl({
  attributionControl: false,
  interactive: false,
  accessToken:
    "pk.eyJ1IjoibmxhaGEiLCJhIjoiY2s2YnR3aTViMTVkODNqbGpvcmQ4cXNkNSJ9.tv42gtwJFcNy3sjYxrPopg",
});

function PostCard(props) {
  const [author, setAuthor] = useState(props.author);
  const [contents, setContents] = useState(props.contents);
  const [likes, setLikes] = useState(props.contents.likes);
  const [likeStatus, setLikeStatus] = useState(props.liked);
  const [deleted, setDeleted] = useState(false);

  const handleLike = () => {
    let likeStatusNew = !likeStatus;
    setLikeStatus(likeStatusNew);
    // make post request to server
    fetch("/posts/changelike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: contents.post_id,
        change_like: likeStatusNew,
      }),
    });

    // update like count
    setLikes(likeStatusNew ? likes + 1 : likes - 1);
  };

  const handleDelete = () => {
    // make post request to server
    fetch("/posts/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: contents.post_id,
      }),
    });

    // deleted
    setDeleted(true);
  };

  useEffect(async () => {
    setAuthor(props.author);
    setContents(props.contents);
    setLikes(props.contents.likes);
    setLikeStatus(props.liked);
  }, [props]);

  return (
    <div>
      {deleted == false ? (
        <Card
          key={props.key}
          variant="outlined"
          className="secondary-card top-margin"
        >
          <CardContent>
            <Link to={"/post/" + contents.post_id}>
              <Typography variant="h5" component="h2" className="red-text">
                Assignment: <b>{contents.title}</b>
              </Typography>
            </Link>
            <Typography variant="h5" component="h2">
              Class: <b>{contents.class}</b>
            </Typography>
            <Typography variant="h6" component="h5">
              Assignment Description:
            </Typography>
            <Typography component="p">{contents.description}</Typography>
            <Typography variant="h6" component="h5">
              Assignment Difficulty:
            </Typography>
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              sx={{ mt: "0.75rem" }}
            >
              <SentimentSatisfiedAltIcon />
              <LinearProgress
                className="difficulty-meter"
                size={40}
                thickness={4}
                variant="determinate"
                value={contents.difficulty}
                sx={{ minWidth: "200px", maxWidth: "500px" }}
              />
              <SentimentVeryDissatisfiedIcon />
            </Stack>
            <Typography variant="h6" component="h5">
              Assignment Duration:
            </Typography>
            <Typography variant="p" component="p">
              {formatDuration(contents.timeStudying)}
            </Typography>
            {contents.coordinates &&
            contents.coordinates[0] != 0 &&
            contents.coordinates[1] != 0 &&
            contents.coordinates[0] != null &&
            contents.coordinates[1] != null ? (
              <Paper className="padding-margin map" variant="outlined">
                <Map
                  style="mapbox://styles/mapbox/dark-v9"
                  containerStyle={{
                    height: "180px",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                  zoom={[15]}
                  center={[
                    props.contents.coordinates[1],
                    props.contents.coordinates[0],
                  ]}
                >
                  <Marker
                    coordinates={[
                      props.contents.coordinates[1],
                      props.contents.coordinates[0],
                    ]}
                    anchor="bottom"
                  >
                    <PersonPinIcon className="person-marker" />
                  </Marker>
                </Map>
              </Paper>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <Paper className="padding-margin" variant="outlined">
              {author ? (
                <Grid
                  container
                  justifyContent="flex-start"
                  direction="row"
                  alignItems="flex-start"
                  sx={{ textAlign: "left" }}
                  spacing={2}
                >
                  <Grid item>
                    <Avatar>
                      <Avatar
                        alt={author.firstName}
                        src={author.microsoft.profilePic}
                      />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Tooltip title="View Profile">
                      <Link
                        className="no-link-style"
                        to={`/profile/${author.microsoft.id}`}
                      >
                        <Button variant="outlined">
                          {author.firstName} {author.lastName}
                        </Button>
                      </Link>
                    </Tooltip>
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
            <Tooltip title="Like">
              <IconButton
                className={likeStatus ? "liked" : "likeBtn"}
                aria-label="like"
                onClick={handleLike}
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" component="h5">
              {likes}
            </Typography>
            <Tooltip title="Copy Link">
              <IconButton
                aria-label="share"
                onClick={() => {
                  navigator.clipboard.writeText(
                    window.location.origin + "/post/" + contents.post_id
                  );
                }}
              >
                <ShareIcon />
              </IconButton>
            </Tooltip>
            {props.owned ? (
              <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={handleDelete}>
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
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
                  Posted: {new Date(contents.createdAt).toLocaleString()}
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

export default PostCard;
