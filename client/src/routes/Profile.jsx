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

class Profile extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ data: res.user }))
      .catch((err) => console.log(err));
  }

  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/users/me`
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
        {this.state.data ? (
          <Paper className="page-container">
            <Typography variant="h4" component="h4" gutterBottom>
              Profile
            </Typography>
            <Card className="secondary-card">
              <CardHeader
                avatar={
                  <Avatar
                    alt={this.state.data.firstName}
                    src={this.state.data.google.profilePic}
                  />
                }
                title={`${this.state.data.firstName} ${this.state.data.lastName}`}
                subheader={this.state.data.google.email}
              />
              <CardMedia className="profile-image" title="Profile Image" />
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
