import React, { useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { API } from "../../service/api.js";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.76);
  border-radius: 7px;
  margin-top: 64px;
`;

const Image = styled("img")({
  //if html element is passed instead of mui element then pass it as a string(write style in camel case)
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const loginInitialValues = {
  username: "",
  password: "",
};
const Login = ({ isUserAuthenticated }) => {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setAccount } = useContext(DataContext);
  // const [isOpen, setIsOpen] = useState(false);

  const onInputChange = (e) => {
    setError("");
    e.preventDefault();
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    e.preventDefault();
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    setError("");
    if (!login.username || !login.password) {
      setError("Enter all the fields");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(login.username, login.password);
      const username = login.username;
      const password = login.password;

      const response = await axios.post(
        "/login",
        {
          username,
          password,
        },
        config
      );
      console.log(response);
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        username: response.data.username,
        name: response.data.name,
      });
      isUserAuthenticated(true);
      navigate("/");
      setLogin(loginInitialValues);
    } catch (error) {
      setError(`Error occured: ${error.message}`);
    }
  };

  const signupUser = async () => {
    setError("");
    if (!signup.name || !signup.username || !signup.password) {
      setError("Enter all the fields!");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const name = signup.name;
      const username = signup.username;
      const password = signup.password;
      const data = await axios.post(
        "/signup",
        {
          name,
          username,
          password,
        },
        config
      );
      // console.log(data);
      if (!data) {
        setError("Could not sign up!");
        return;
      }
      // console.log(data);
      setError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } catch (error) {
      setError(`Error occured: ${error.message}`);
    }
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              label="Enter username"
              variant="standard"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              sx={{
                marginTop: 2,
              }}
            />
            <TextField
              label="Enter password"
              variant="standard"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              sx={{
                marginTop: 2,
              }}
            />
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                loginUser();
              }}
              sx={{
                marginTop: 2,
                textTransform: "none",
                background: "#F23A1F",
                color: "#fff",
                height: "36px",
                borderRadius: "24px",
                "&:hover": {
                  background: "#FB6148",
                },
              }}
            >
              Login
            </Button>
            {error && (
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "ff6161",
                  lineHeight: 0,
                  marginTop: "10px",
                  fontWeight: 600,
                }}
              >
                {error}
              </Typography>
            )}
            <Typography
              sx={{
                marginTop: 1,
                textAlign: "center",
                color: "#878787",
                fontSize: "15px",
              }}
            >
              OR
            </Typography>
            <Button
              variant="outlined"
              sx={{
                marginTop: 1,
                textTransform: "none",
                background: "#fff",
                color: "#2874f0",
                height: "36px",
                borderRadius: "24px",
                boxShadow: "0 2px 4px 0 rgb(0 0 0/0.2)",
              }}
              onClick={() => toggleAccount("signup")}
            >
              Create an account
            </Button>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              label="Enter Name"
              variant="standard"
              name="name"
              onChange={(e) => onInputChange(e)}
              sx={{
                marginTop: 2,
              }}
            />
            <TextField
              label="Enter Username"
              variant="standard"
              name="username"
              onChange={(e) => onInputChange(e)}
              sx={{
                marginTop: 2,
              }}
            />
            <TextField
              label="Enter Password"
              variant="standard"
              name="password"
              type="password"
              onChange={(e) => onInputChange(e)}
              sx={{
                marginTop: 2,
              }}
            />
            {error && (
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "ff6161",
                  lineHeight: 0,
                  marginTop: "10px",
                  fontWeight: 600,
                }}
              >
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                signupUser();
              }}
              sx={{
                marginTop: 2,
                textTransform: "none",
                background: "#F23A1F",
                color: "#fff",
                height: "36px",
                borderRadius: "24px",
                "&:hover": {
                  background: "#FB6148",
                },
              }}
            >
              Sign Up
            </Button>
            <Typography
              sx={{
                marginTop: 1,
                textAlign: "center",
                color: "#878787",
                fontSize: "15px",
              }}
            >
              OR
            </Typography>
            <Button
              variant="outlined"
              sx={{
                marginTop: 1,
                textTransform: "none",
                background: "#fff",
                color: "#2874f0",
                height: "36px",
                borderRadius: "24px",
                boxShadow: "0 2px 4px 0 rgb(0 0 0/0.2)",
              }}
              onClick={() => {
                toggleAccount("login");
              }}
            >
              Already have an account?
            </Button>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
