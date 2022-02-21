import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Paper, Grid, Button, Card, CardContent } from "@mui/material";

import PostCard from "./Posts";

import { formatDuration } from "../utility";

const user = {
  firstName: "Example",
  lastName: "User",
  microsoft: {
    profilePic:
      "https://pbs.twimg.com/profile_images/1465047742338646019/a54vdnaQ_400x400.jpg",
    email: "test@example.com",
  },
};

class Home extends Component {
  state = {
    recentPosts: null,
    stats: {
      numPosts: 0,
      numUsers: 0,
      totalTime: 0,
      avgTime: 0,
    },
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ recentPosts: res }))
      .catch((err) => console.log(err));

    this.getStats()
      .then((res) => this.setState({ stats: res }))
      .catch((err) => console.log(err));
  }

  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch(`/posts`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  getStats = async () => {
    const response = await fetch(`/stats/global`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
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
                justifyContent="left"
                alignItems="center"
              >
                <Grid item xs={5}>
                  <Typography variant="h6" component="h2">
                    Total Posts: {this.state.stats.numPosts}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h6" component="h2">
                    Total Cougs: {this.state.stats.numUsers}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h6" component="h2">
                    Total Study Time:{" "}
                    {formatDuration(this.state.stats.totalTime)}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h6" component="h2">
                    Average Study Time:{" "}
                    {formatDuration(this.state.stats.avgTime)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {this.state.recentPosts ? (
            <div>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Grid item xs>
                  <Typography variant="h4" component="h4" gutterBottom>
                    Recent Posts
                  </Typography>
                </Grid>
                <Link to="/post" className="no-link-style">
                  <Button variant="contained">New Post</Button>
                </Link>
              </Grid>
              {this.state.recentPosts.map((post) => (
                <PostCard
                  author={post.author}
                  contents={post.post}
                  liked={post.liked}
                />
              ))}
            </div>
          ) : (
            <Typography variant="h5" align="center" component="h5" gutterBottom>
              Loading...
            </Typography>
          )}
        </Paper>
      </Container>
    );
  }
}

export { Home };
