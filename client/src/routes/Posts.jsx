import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { Card, CardContent, Typography } from "@mui/material";

class NewPost extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1>New Post</h1>
      </div>
    );
  }
}

class PostCard extends Component {
  state = {};

  render() {
    return (
      <Card variant="outlined" className="post-card">
        <CardContent>
          <Typography variant="h5" component="h2">
            Post Title
          </Typography>
          <Typography component="p">Post Description</Typography>
        </CardContent>
      </Card>
    );
  }
}

export { NewPost, PostCard };
