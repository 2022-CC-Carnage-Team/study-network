import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
  Paper,
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  CardContent,
} from "@mui/material";
import { Grid } from "@mui/material";

import { UserHeatmap } from "./Heatmap";

import { formatDuration } from "../utility";

import PostList from "./PostList";

function Profile(props) {
  const [userPosts, setUserPosts] = useState();
  const [stats, setStats] = useState({
    numPosts: 0,
    numUsers: 0,
    totalTime: 0,
    avgTime: 0,
    timeByDay: [],
  });
  let [searchParams, setSearchParams] = useSearchParams();
  let [user, setUser] = useState({
    firstName: "",
    lastName: "",
    microsoft: {
      email: "",
      id: "",
      profilePic: "",
    },
    likedPosts: [],
  });
  const { userid } = useParams();

  useEffect(async () => {
    let res = [];
    let newUser = {};
    if (!props.user) {
      // if userid then fetch user from api
      if (userid) {
        let fuser = await fetch(`/users/fetch?id=${userid}`);
        fuser = await fuser.json();
        newUser = fuser.user;
        setUser(fuser.user);
      }
    } else {
      setUser(props.user);
      newUser = props.user;
    }

    if (newUser && newUser.microsoft) {
      res = await callBackendAPI(newUser);
      setUserPosts(res);
    }

    if (newUser && newUser.microsoft) {
      res = await getStats(newUser);
      setStats(res);
    }
  }, [userid, props.user, searchParams]);

  // fetching the GET route from the Express server which matches the GET route from server.js
  // precondition, newUser must be valid
  const callBackendAPI = async (newUser) => {
    let recentUrl = `/posts?page=${searchParams.get("page")}&user=${
      newUser.microsoft.id
    }`;
    let searchUrl = `/posts?q=${searchParams.get("q")}&page=${searchParams.get(
      "page"
    )}&user=${newUser.microsoft.id}`;
    const response = await fetch(searchParams.get("q") ? searchUrl : recentUrl);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  // precondition, newUser must be valid
  const getStats = async (newUser) => {
    const response = await fetch(
      `/stats/user?id=${newUser.microsoft.id}&timezone=${
        //get current timezone from browser
        Intl.DateTimeFormat().resolvedOptions().timeZone
      }`
    );
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  return (
    <Container maxWidth="lg">
      {user ? (
        <Paper className="page-container">
          <Typography variant="h4" component="h4" gutterBottom>
            Profile
          </Typography>
          <Card className="user-card">
            <CardHeader
              avatar={
                <Avatar alt={user.firstName} src={user.microsoft.profilePic} />
              }
              title={`${user.firstName} ${user.lastName}`}
              subheader={user.microsoft.email}
            />
            <CardMedia className="profile-image" title="Profile Image" />
          </Card>
          <Card variant="outlined" className="secondary-card top-margin">
            <CardContent>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={3}
              >
                <Grid item lg>
                  <Typography variant="h5" component="h5">
                    Study Time
                  </Typography>
                  <UserHeatmap data={stats.timeByDay} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Typography variant="h4" component="h4">
            User Study Stats
          </Typography>
          <Card variant="outlined" className="secondary-card top-margin">
            <CardContent>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item lg={8}>
                  <Typography variant="h6" component="h2">
                    <b>Total Posts:</b> {stats.numPosts}
                  </Typography>
                </Grid>
                <Grid item lg={8}>
                  <Typography variant="h6" component="h2">
                    <b>Total Study Time:</b> {formatDuration(stats.totalTime)}
                  </Typography>
                </Grid>
                <Grid item lg={8}>
                  <Typography variant="h6" component="h2">
                    <b>Average Study Time:</b> {formatDuration(stats.avgTime)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <PostList posts={userPosts} owned={props.user} />
        </Paper>
      ) : (
        <Paper className="page-container">
          <Typography variant="h5" align="center" component="h5" gutterBottom>
            Loading...
          </Typography>
        </Paper>
      )}
    </Container>
  );
}

export { Profile };
