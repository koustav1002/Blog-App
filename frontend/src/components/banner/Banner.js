import { Box, Typography, styled } from "@mui/material";
const Image = styled(Box)`
  background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg)
    center/55% repeat;
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Banner = () => {
  return (
    <Image>
      <Typography sx={{ fontSize: "70px", color: "#FFFFFF", lineHeight: 1 }}>
        BLOG
      </Typography>
      <Typography
        sx={{
          fontSize: "20px",
          color: "#FFFFFF",
        }}
      >
        Share your story. Find your voice.
      </Typography>
    </Image>
  );
};

export default Banner;
