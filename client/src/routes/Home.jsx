import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

import { PostCard } from "./Posts";

const user = {
  firstName: "Example",
  lastName: "User",
  google: {
    profilePic:
      "https://pbs.twimg.com/profile_images/1465047742338646019/a54vdnaQ_400x400.jpg",
    email: "test@example.com",
  },
};

class Home extends Component {
  state = {
    recentPosts: null,
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ recentPosts: res }))
      .catch((err) => console.log(err));
  }

  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/posts`);
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
          {this.state.recentPosts ? (
            <div>
              <Typography variant="h4" component="h4" gutterBottom>
                Recent Posts
              </Typography>
              {this.state.recentPosts.map((post) => (
                <PostCard author={post.author} contents={post.post} />
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
