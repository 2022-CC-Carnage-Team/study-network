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
} from "@mui/material";
import { Grid, Button } from "@mui/material";

import PostCard from "./Posts";

import { UserHeatmap } from "./Heatmap";

class Profile extends Component {
  state = {
    userPosts: null,
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ userPosts: res }))
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
