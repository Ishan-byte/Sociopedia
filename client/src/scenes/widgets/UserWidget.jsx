import { useTheme } from "@emotion/react";
import { ManageAccountsOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";

// Custom Copmonents
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";

const UserWidget = ({ userId, picturePath }) => {
  // CONFIGS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // COLOR CONFIGS
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // USER states
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);

  // fucntion for getting a specific user data
  const getUser = async () => {
    const user = await fetch(`http:localhost:3001/users/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const userResponse = await user.json();

    if (userResponse.error) {
      return window.alert(userResponse.error);
    } else {
      setUser(userResponse);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // In the case if the user is not retrivable
  if (!user) {
    return null;
  }

  // Destructuring the user information
  const {
    firstname,
    lastname,
    occupation,
    location,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <UserImage image={picturePath}></UserImage>
        <Box>
          <Typography
            variant="h4"
            color={dark}
            fontWeight="bold"
            sx={{
              "&: hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {firstname} {lastname}
          </Typography>
          <Typography color={medium}>{friends.length} friends</Typography>
        </Box>
      </FlexBetween>
      <ManageAccountsOutlined />
    </WidgetWrapper>
  );
};

export default UserWidget;
