import React, { useState } from "react";
import {  useNavigate,useSearchParams } from "react-router-dom";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { matBlack } from "../constants/color";
import AvatarCard from '../components/shared/AvatarCard'
import {Link} from '../components/styles/StyledComponents'
import { samepleChats } from "../constants/sampleData";


const Groups = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const chatId = useSearchParams()[0].get('groups')
console.log(chatId);
  const navigateBack = () => {
    navigate("/");
  };
  const handleMobile = () => {
    // open or close menu
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };
  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          position: "fixed",
          right: "2rem",
          top: "2rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            backgroundColor: matBlack,
            color: "white",
            //hover
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        bgcolor={"bisque"}
        sm={4}
      >
        <GroupList myGroups={samepleChats} chatId={chatId}/>
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: "1rem 5rem",
          alignItems: "center",
        }}
      >
        {IconBtns}
      </Grid>
      {/* Mobile Dropdown Menu */}
      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <GroupList myGroups={samepleChats} chatId={chatId} w={"50vw"} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />)
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        NO Groups
      </Typography>
    )}
  </Stack>
);
const GroupListItem = ({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return <Link to={`?groups=${_id}`} onClick={e => {
    if(chatId === _id) e.preventDefault();
    
  }}>
    <Stack
      direction={"row"}
      spacing={"1rem"}
      alignItems={"center"}
    >
      <AvatarCard avatar={avatar}/>
      <Typography>{name}</Typography>
    </Stack>
  </Link>
};

export default Groups;
