import { Box, Button, TextareaAutosize, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import axios from "axios";
import { getAccessToken } from "../../../utils/commonUtils";
import Comment from "./Comment";

const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
});

const StyledTextArea = styled(TextareaAutosize)`
  height: 100px !important;
  width: 100%;
  margin: 0 20px;
`;

const initialValue = {
  name: "",
  postId: "",
  date: new Date(),
  comments: "",
};

const Comments = ({ post }) => {
  const url = "https://static.thenounproject.com/png/12017-200.png";

  const [comment, setComment] = useState(initialValue);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);

  const { account } = useContext(DataContext);

  useEffect(() => {
    const getData = async () => {
      const params = {
        id: post._id,
      };
      const config = {
        headers: {
          Authorization: `${getAccessToken()}`,
        },
        params,
      };
      const response = await axios.get(`/comments/${post._id}`, config); //API call

      if (response) {
        console.log(response);
        setComments(response.data);
      }
    };
    getData();
  }, [post, toggle]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const addComment = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getAccessToken()}`,
      },
    };
    const response = await axios.post("/comment/new", comment, config); //API call
    if (response.status === 200) {
      setComment(initialValue);
    }
    setToggle(!toggle);
  };

  return (
    <Box>
      <Container>
        <Image src={url} alt="dp" />
        <StyledTextArea
          minRows={5}
          placeholder="What's on you mind...?"
          value={comment.comments}
          onChange={(e) => handleChange(e)}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ height: 40 }}
          onClick={(e) => addComment(e)}
        >
          Post
        </Button>
      </Container>
      <Box>
        {comments &&
          comments.length > 0 &&
          comments.map((comm) => <Comment comment={comm} setToggle={setToggle} key={comm._id} />)}
      </Box>
    </Box>
  );
};

export default Comments;
