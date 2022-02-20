import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
  Paper,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  Avatar,
  CardContent,
} from "@mui/material";
import { Grid, Button } from "@mui/material";

import PostCard from "./Posts";

import { UserHeatmap } from "./Heatmap";

import { formatDuration } from "../utility";

class Profile extends Component {
  state = {
    userPosts: null,
    stats: {
      numPosts: 0,
      numUsers: 0,
      totalTime: 0,
      avgTime: 0,
    },
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ userPosts: res }))
      .catch((err) => console.log(err));

    this.getStats()
      .then((res) => this.setState({ stats: res }))
      .catch((err) => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/posts/userposts`
    );
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  getStats = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/stats/global`
    );
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <Container maxWidth="lg">
        {this.props.user ? (
          <Paper className="page-container">
            <Typography variant="h4" component="h4" gutterBottom>
              Profile
            </Typography>
            <Card className="secondary-card">
              <CardHeader
                avatar={
                  <Avatar
                    alt={this.props.user.firstName}
                    src={this.props.user.google.profilePic}
                  />
                }
                title={`${this.props.user.firstName} ${this.props.user.lastName}`}
                subheader={this.props.user.google.email}
              />
              <CardMedia className="profile-image" title="Profile Image" />
            </Card>
            {/* <Card className="secondary-card padding-margin">
              <UserHeatmap />
            </Card> */}
            <Typography variant="h4" component="h4">
              User Study Stats
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
            {this.state.userPosts ? (
              <div>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-end"
                >
                  <Grid item xs>
                    <Typography variant="h4" component="h4" gutterBottom>
                      Posts
                    </Typography>
                  </Grid>
                  <Link to="/post" className="no-link-style">
                    <Button variant="contained">New Post</Button>
                  </Link>
                </Grid>
                {this.state.userPosts.map((post) => (
                  <PostCard
                    owned={true}
                    author={post.author}
                    contents={post.post}
                  />
                ))}
              </div>
            ) : (
              <Typography
                variant="h5"
                align="center"
                component="h5"
                gutterBottom
              >
                No posts yet!
              </Typography>
            )}
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
}

export { Profile };
