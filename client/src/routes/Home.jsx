import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

import { PostCard } from "./Posts";

class Home extends Component {
  state = {};

  render() {
    return (
      <Container maxWidth="lg">
        <Paper className="page-container">
          <Typography variant="h4" component="h4" gutterBottom>
            Recent Posts
          </Typography>
          <PostCard />
        </Paper>
      </Container>
    );
  }
}

export { Home };
