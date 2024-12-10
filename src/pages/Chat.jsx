import React, { useRef } from 'react'
import {AppLayout} from '../components/layout/AppLayout';
import { IconButton, Stack } from '@mui/material';
import { grayColor,orange } from '../constants/color';
import { AttachFile as AttachFileIcon, Send as SendIcon} from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessages } from '../constants/sampleData';
import MessageComp from '../components/shared/MessageComponent';


const user = {
  _id:"sdfsdfsdf",
  name: 'User',
}
const Chat = () => {
  const containerRef = useRef();


  return (
    <>
      <Stack 
        ref={containerRef}
        boxSizing={'border-box'}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={'90%'}
        sx={{
          overflowX:"hidden",
          overflowY:"auto"
        }}
      >

        {/* Messgae Render */}
        {
          sampleMessages.map(i => (
            <MessageComp key={i._id} message={i} user={user} />
          ))
        }

      </Stack>

      <form style={{
        height:'10%'
        }}
      >
        <Stack 
          direction={"row"} 
          height={"100%"}
          padding={'1rem'}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position:"absolute",
              left:'1.5rem',
              rotate:'30deg'
            }}
          >
            <AttachFileIcon/>
          </IconButton>

          <InputBox placeholder='Type Message here .... ' />

          <IconButton sx={{
            bgcolor: orange,
            color:"white",
            marginLeft:"1rem",
            padding:'0.5rem',
            "&:hover":{
              bgcolor:"error.dark"
            }
          }}>
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