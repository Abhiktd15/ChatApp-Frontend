import React, { useRef, useState } from 'react'
import {AppLayout} from '../components/layout/AppLayout';
import { Box, IconButton, Skeleton, Stack } from '@mui/material';
import { grayColor,orange } from '../constants/color';
import { AttachFile as AttachFileIcon, Send as SendIcon} from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessages } from '../constants/sampleData';
import MessageComp from '../components/shared/MessageComponent';
import { GetSocket } from '../socket';
import { NEW_MESSAGE } from '../constants/events';
import { useChatDetailsQuery } from '../store/api/api';

const user = {
  _id:"sdfsdfsdf",
  name: 'User',
}
const Chat = ({chatId}) => {
  const containerRef = useRef();
  const socket = GetSocket();
  const chatDetails = useChatDetailsQuery({chatId,skip:!chatId})
  const members = chatDetails?.data?.chat?.members
  console.log(chatDetails?.data?.chat)

  const [message,setMessage] = useState("")

  const submitHandler = (e) => {
    e.preventDefault();
    
    if(!message.trim()) return;

    //Emmitting message to the server 
    socket.emit(NEW_MESSAGE,{chatId,members,message})
    setMessage("")


  }

  return chatDetails.isLoading ? (
    <Skeleton/>
  ):(
    <>
      <Box 
        sx={{
            overflowX:"hidden",
            overflowY:"auto",
        }} 
        height={'90%'}
        boxSizing={'border-box'}
        width="auto"
        bgcolor="white"
        boxShadow="0 8px 12px rgba(0,0,0,0.2)"
        borderRadius="15px"
        textAlign="center"
      >
        <Stack 
          ref={containerRef}
          height={'100%'}
          padding={"1rem"}
          spacing={"1rem"}
          bgcolor={grayColor}
        >

          {/* Messgae Render */}
          {
            sampleMessages.map(i => (
              <MessageComp key={i._id} message={i} user={user} />
            ))
          }

        </Stack>
      </Box>

      <form style={{
        height:'10%'
        }}
        onSubmit={submitHandler}
      >
        <Stack 
          direction={"row"} 
          height={"100%"}
          padding={'0.2rem'}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position:"absolute",
              left:'1.5rem',
              rotate:'30deg',
              }}
          >
            <AttachFileIcon/>
          </IconButton>

          <InputBox  placeholder='Type Message here .... ' value={message} onChange={e => setMessage(e.target.value)}/>

          <IconButton sx={{
            bgcolor: orange,
            position: 'absolute',
            right:'1.5rem',
            color:"white",
            marginLeft:"1rem",
            padding:'0.5rem',
            "&:hover":{
              bgcolor:"error.dark"
            }
            
          }}
            onClick={submitHandler}
          >
            <SendIcon/>
          </IconButton>
        </Stack>
      </form>

      <FileMenu/>
    </>
  )
}
const WrappedChat = AppLayout(Chat)

export default WrappedChat;