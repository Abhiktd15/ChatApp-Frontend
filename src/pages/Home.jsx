import React from 'react'
import {AppLayout} from '../components/layout/AppLayout';
import { Box, Typography } from '@mui/material';
import { grayColor } from '../constants/color';

const Home = () => {
  return (
    <Box
      bgcolor={grayColor}
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="100%"
        height="100%"
        alignContent={"center"}
        bgcolor="white"
        boxShadow="0 4px 12px rgba(0,0,0,0.2)"
        borderRadius="15px"
        textAlign="center"
        p="2rem"
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Welcome to Talkative!
        </Typography>
        <Typography variant="body1" color="textSecondary" mb="1rem">
          Select a friend from the list to start chatting.
        </Typography>
        <Box
          bgcolor="rgba(255, 0, 0, 0.1)"
          p="1rem"
          borderRadius="50%"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          mb="1rem"
        >
          <img
            src="https://img.icons8.com/ios-filled/50/000000/chat.png"
            alt="chat icon"
            style={{ width: "40px", height: "40px" }}
          />
        </Box>
        <Typography variant="body2" color="textSecondary">
          Don't see any friends? Try adding them to your contact list!
        </Typography>
      </Box>
    </Box>

  )
}
const WrappedChat = AppLayout(Home)

export default WrappedChat;