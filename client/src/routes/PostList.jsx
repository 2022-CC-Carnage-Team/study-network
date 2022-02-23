import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

//import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Grid, Button, Pagination } from "@mui/material";

import PostCardCondensed from "./PostCondensed";

function PostList(props) {
  let [numPages, setNumPages] = useState(1);
  let [currentPage, setCurrentPage] = useState(1);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(async () => {
    // get number of pages
    fetchNumPages();

    setCurrentPage(parseInt(searchParams.get("page") || 1));
  }, [searchParams.get("q")]);

  const fetchNumPages = async () => {
    let allUrl = `/posts/numPages?page=${searchParams.get("page")}`;
    let searchUrl = `/posts/numPages?q=${searchParams.get(
      "q"
    )}page=${searchParams.get("page")}`;
    const response = await fetch(searchParams.get("q") ? searchUrl : allUrl);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    setNumPages(body.numPages);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    setSearchParams({
      ...searchParams,
      page: value,
    });
  };

  return (
    <React.Fragment>
      {props.posts && props.posts.length > 0 ? (
        <div>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Grid item xs>
              <Typography variant="h4" component="h4" gutterBottom>
                {searchParams.get("q") !== null
                  ? `Showing posts for: "${
                      searchParams.get("q").substring(0, 10) + "..."
                    }"`
                  : "Recent Posts"}
              </Typography>
            </Grid>
            <Link to="/post" className="no-link-style">
              <Button variant="contained">New Post</Button>
            </Link>
          </Grid>
          <Pagination
            sx={{
              m: "2rem",
              textAlign: "center",
            }}
            count={numPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            className="pagination"
          />
          {props.posts.map((post) => (
            <PostCardCondensed
              owned={props.owned}
              author={post.author}
              contents={post.post}
              liked={post.liked}
            />
          ))}
          <Pagination
            sx={{
              m: "2rem",
              textAlign: "center",
            }}
            count={numPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            className="pagination"
          />
        </div>
      ) : (
        <Typography variant="h5" align="center" component="h5" gutterBottom>
          No Posts
        </Typography>
      )}
    </React.Fragment>
  );
}

export default PostList;
