import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

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
  useMediaQuery,
  CardHeader,
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

function PostCardCondensed(props) {
  const [author, setAuthor] = useState(props.author);
  const [contents, setContents] = useState(props.contents);
  const [likes, setLikes] = useState(props.contents.likes);
  const [likeStatus, setLikeStatus] = useState(props.liked);
  const [deleted, setDeleted] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");

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
    <div className="post-card-condensed">
      {deleted == false ? (
        <Card
          key={props.key}
          variant="outlined"
          className="secondary-card top-margin"
        >
          <CardHeader
            sx={{ backgroundColor: "#111111" }}
            avatar={
              author ? (
                <React.Fragment>
                  <IconButton>
                    <Link
                      className="no-link-style"
                      to={`/profile/${author.microsoft.id}`}
                    >
                      <Avatar
                        alt={author.firstName}
                        src={author.microsoft.profilePic}
                      />
                    </Link>
                  </IconButton>
                </React.Fragment>
              ) : (
                <Typography variant="p" component="p">
                  Unknown User
                </Typography>
              )
            }
            title={
              <Link to={"/post/" + contents.post_id}>
                <Typography variant="h5" component="h2" className="red-text">
                  <b>{contents.title}</b>
                </Typography>
              </Link>
            }
            subheader={
              <React.Fragment>
                <b>{contents.class}</b> |{" "}
                {contents.description.substring(0, 200) +
                  (contents.description.length > 200 ? "..." : "")}
              </React.Fragment>
            }
          ></CardHeader>
          <CardContent sx={{ pt: 0, pb: 0 }}>
            <Card sx={{ p: 2 }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <SentimentSatisfiedAltIcon />
                <LinearProgress
                  className="difficulty-meter"
                  size={40}
                  thickness={4}
                  variant="determinate"
                  value={contents.difficulty}
                  sx={{
                    maxWidth: "500px",
                    width: "100%",
                  }}
                />
                <SentimentVeryDissatisfiedIcon />
              </Stack>
            </Card>
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

export default PostCardCondensed;
