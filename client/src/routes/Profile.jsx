import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

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
    console.log(body);

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <div>
        <h1>Profile</h1>
        {this.state.data ? (
          <div>
            <p>{this.state.data.firstName}</p>
            <p>{this.state.data.email}</p>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export { Profile };
