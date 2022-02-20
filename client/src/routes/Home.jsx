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
  state = {};

  render() {
    return (
      <Container maxWidth="lg">
        <Paper className="page-container">
          <Typography variant="h4" component="h4" gutterBottom>
            Recent Posts
          </Typography>
          <PostCard author={user} />
        </Paper>
      </Container>
    );
  }
}

export { Home };
