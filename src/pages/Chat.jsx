import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { Box, IconButton, Skeleton, Stack } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { useInfiniteScrollTop } from "6pp";
import FileMenu from "../components/dialogs/FileMenu";
import { AppLayout } from "../components/layout/AppLayout";
import MessageComp from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponents";
import { grayColor, orange } from "../constants/color";
import { NEW_MESSAGE } from "../constants/events";
import { useErrors, useSockeEvents } from "../hooks/hook";
import { GetSocket } from "../socket";
import { useChatDetailsQuery, useGetMessagesQuery } from "../store/api/api";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const socket = GetSocket();
  const [message, setMessage] = useState("");
  const [chat, setChats] = useState([]);
  const [page, setPage] = useState(1);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const members = chatDetails?.data?.chat?.members;

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const {data:oldMessages,setData:setOldMessages} = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  console.log("oldMessages  ",oldMessages)

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  // console.log(oldMessagesChunk?.data);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    //Emmitting message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  //Temporarily not using useCallback hook here
  const newMessagesHandler = (data) => {
    setChats((prev) => [...prev, data.message]);
  };

  const eventHandlers = { [NEW_MESSAGE]: newMessagesHandler };
  useSockeEvents(socket, eventHandlers);

  useErrors(errors);
  // const allMessages = [...oldMessages,...chat]
  // console.log(allMessages)

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Box
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
        height={"90%"}
        boxSizing={"border-box"}
        width="auto"
        bgcolor="white"
        boxShadow="0 8px 12px rgba(0,0,0,0.2)"
        borderRadius="15px"
        textAlign="center"
      >
        <Stack
          ref={containerRef}
          height={"100%"}
          padding={"1rem"}
          spacing={"1rem"}
          bgcolor={grayColor}
        >
          {!oldMessagesChunk.isLoading &&
            oldMessagesChunk?.data?.messages?.map((i) => (
              <MessageComp key={i._id} message={i} user={user} />
            ))}
          {chat.map((i) => (
            <MessageComp key={i._id} message={i} user={user} />
          ))}
        </Stack>
      </Box>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"0.2rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message here .... "
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <IconButton
            sx={{
              bgcolor: orange,
              position: "absolute",
              right: "1.5rem",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
            onClick={submitHandler}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </>
  );
};
const WrappedChat = AppLayout(Chat);

export default WrappedChat;
