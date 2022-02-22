import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Paper, Grid, Card, CardContent } from "@mui/material";

import { formatDuration } from "../utility";

import PostList from "./PostList";

function Home() {
  const [recentPosts, setRecentPosts] = useState();
  const [stats, setStats] = useState({
    numPosts: 0,
    numUsers: 0,
    totalTime: 0,
    avgTime: 0,
  });
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(async () => {
    console.log(searchParams);
    let res = await callBackendAPI();
    setRecentPosts(res);

    res = await getStats();
    setStats(res);
  }, [searchParams.get("q"), searchParams.get("page")]);

  // fetching the GET route from the Express server which matches the GET route from server.js
  const callBackendAPI = async () => {
    let recentUrl = `/posts?page=${searchParams.get("page")}&user=false`;
    let searchUrl = `/posts?q=${searchParams.get("q")}&page=${searchParams.get(
      "page"
    )}&user=false`;
    const response = await fetch(searchParams.get("q") ? searchUrl : recentUrl);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const getStats = async () => {
    const response = await fetch(`/stats/global`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  return (
    <Container maxWidth="lg">
      <Paper className="page-container">
        <Typography variant="h4" component="h4">
          Coug Study Stats
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
              <Grid item lg={2}>
                <Typography variant="h6" component="h6">
                  <b>Total Posts:</b> {stats.numPosts}
                </Typography>
              </Grid>
              <Grid item lg={8}>
                <Typography variant="h6" component="h6">
                  <b>Total Cougs:</b> {stats.numUsers}
                </Typography>
              </Grid>
              <Grid item lg={8}>
                <Typography variant="h6" component="h6">
                  <b>Total Study Time:</b> {formatDuration(stats.totalTime)}
                </Typography>
              </Grid>
              <Grid item lg={8}>
                <Typography variant="h6" component="h6">
                  <b>Average Study Time:</b> {formatDuration(stats.avgTime)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <PostList posts={recentPosts} />
      </Paper>
    </Container>
  );
}

export { Home };
