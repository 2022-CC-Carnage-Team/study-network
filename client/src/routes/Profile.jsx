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

import { UserHeatmap } from "./Heatmap";

class Profile extends Component {
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
            <Card className="secondary-card padding-margin">
              <UserHeatmap />
            </Card>
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
