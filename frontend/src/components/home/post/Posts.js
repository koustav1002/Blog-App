import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { getAccessToken } from "../../../utils/commonUtils";

import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        category: category || "",
      };
      const config = {
        headers: {
          // Authorization header is within the headers object
          Authorization: `${getAccessToken()}`,
        },
        params,
      };
      const response = await axios.get("/posts", config); //API call
      if (response) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, [category]); //useEffect with [] so that posts are fetched straightaway on landing on the home page
  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Grid item lg={3} sm={4} xs={12} key={post._id}>
            <Link
              to={`details/${post._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Post post={post} />
            </Link>
          </Grid>
        ))
      ) : (
        <Box sx={{ color: "#878787", margin: "30px 80px", fontSize: 18 }}>
          No data is available to display
        </Box>
      )}
    </>
  );
};

export default Posts;
