import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import { Box, Typography, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { getAccessToken } from "../../../utils/commonUtils";
import axios from "axios";

const Component = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 10px;
`;

const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  margin-right: 20px;
`;

const StyledDate = styled(Typography)`
  font-size: 14px;
  color: #878787;
`;

const DeleteIcon = styled(Delete)`
  margin-left: auto;
  cursor: pointer;
`;

const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);

  const removeComment = async () => {
    const params = {
      id: comment._id,
    };
    const config = {
      headers: {
        Authorization: `${getAccessToken()}`,
      },
      params,
    };
    const response = await axios.delete(
      `/comment/delete/${comment._id}`,
      config
    ); //API call

    if (response.status === 200) {
      setToggle((prevState) => !prevState);
    }
  };
  return (
    <Component>
      <Container>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {comment.name === account.username && (
          <DeleteIcon onClick={() => removeComment()} />
        )}
      </Container>
      <Box>
        <Typography>{comment.comments}</Typography>
      </Box>
    </Component>
  );
};

export default Comment;
