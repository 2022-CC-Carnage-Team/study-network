import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Paper, Grid, Button } from "@mui/material";
import { useParams } from "react-router-dom";

import PostCard from "./Posts";

function SinglePost(props) {
  const [post, setPost] = useState();
  const { postid } = useParams();

  useEffect(async () => {
    let res = await callBackendAPI();
    setPost(res);
  }, []);

  const callBackendAPI = async () => {
    // send post request to /posts/fetch with the post id in the body
    let res = await fetch("/posts/fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: postid,
      }),
    });

    if (res.status !== 200) {
      throw Error(res.message);
    }

    res = await res.json();

    return res;
  };

  return (
    <Container maxWidth="lg">
      <Paper className="page-container">
        {post ? (
          <div>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Grid item xs>
                <Typography variant="h4" component="h4" gutterBottom>
                  <Link to="/" className="no-link-styles">
                    <Button variant="contained">Back</Button>
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <PostCard
              key={post.post_id}
              author={post.author}
              contents={post.post}
              liked={post.liked}
            />
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

export { SinglePost };
