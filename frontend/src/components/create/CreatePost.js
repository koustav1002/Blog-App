import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { DataContext } from "../../context/DataProvider";

import { getAccessToken } from "../../utils/commonUtils";

import axios from "axios";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")`
  width: 100%;
  height: 50vh;
  object-fit: cover;
`;

const StyledFormControl = styled(FormControl)`
  margintop: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 25px;
  font-size: 18px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdAt: new Date(),
};

const CreatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const { account } = useContext(DataContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        
        data.append("file", file);
        data.append("upload_preset", `${process.env.REACT_APP_UPLOAD_PRESET}`);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
          data
        );

        post.picture = response.data["secure_url"];
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "all";
    post.username = account.username;
  }, [file]);

  const handleChange = (e) => {
    // e.preventDefault();

    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    //API call to save post
    // let response = "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getAccessToken()}`,
      },
    };
    console.log(post);
    const response = await axios.post("/create", post, config);
    console.log(response);

    if (response) {
      navigate("/");
    } else {
      console.log("Some error occured!");
    }
  };
  return (
    <Container>
      <Image src={url} alt="banner" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          placeholder="Title"
          name="title"
          onChange={(e) => handleChange(e)}
        />
        <Button variant="contained" onClick={() => savePost()}>
          Publish
        </Button>
      </StyledFormControl>
      <Textarea
        minRows={5}
        placeholder="Tell your story...."
        name="description"
        onChange={(e) => handleChange(e)}
      ></Textarea>
    </Container>
  );
};

export default CreatePost;
