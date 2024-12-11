import { Face as FaceIcon,CalendarMonth as CalendarIcon,AlternateEmail as UsernameIcon } from "@mui/icons-material";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import moment from "moment"

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"} padding={'1rem'}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard text={"I am a web devloper currently learning Socket.io "} heading={"Bio"}/>
      <ProfileCard text={"abhiktd15"} icon={<UsernameIcon/>} heading={"Username"}/>
      <ProfileCard text={"Abhishek Bhardwaj"} icon={<FaceIcon/>} heading={"Name"}/>
      <ProfileCard text={moment("2024-12-10T00:00:00.000Z").fromNow()} icon={<CalendarIcon/>} heading={"Joined"}/>
    </Stack>
  );
};
const ProfileCard = ({ text, icon, heading }) => {
  return (
    <Stack 
      direction={"row"} 
      alignItems={"center"} 
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
    >
      {icon && icon}
      <Stack>
        <Typography variant="body1">
          {text}
        </Typography>
        <Typography color={"gray"} variant="caption">
          {heading}
        </Typography>
      </Stack>

    </Stack>
  );
};

export default Profile;
