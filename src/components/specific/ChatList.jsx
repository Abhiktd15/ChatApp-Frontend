import { Stack } from "@mui/material";
import React from "react";
import ChatItems from "../shared/ChatItem";

const ChatList = ({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [
        {
        chatId: "",
        count: 0,
        },
    ],
    handleDeleteChat
    }) => {
    return <Stack width={w} direction={"column"}
            sx={{
                overflow:"auto",
                height:"90%",
                scrollBehavior:"auto"
            }}
        >
        {
            chats?.map((data,index) => {
                const {avatar,_id,name,groupChat,members} = data
                const newMessageAlert = newMessagesAlert.find(
                    ({chatId}) => chatId === _id
                )
                const isOnline = members?.some((member) => onlineUsers.includes(_id))
                return (
                    <ChatItems
                        key={_id}
                        newMessageAlert={newMessageAlert}
                        isOnline={isOnline}
                        avatar={avatar}
                        _id={_id}
                        name={name}
                        groupChat={groupChat}
                        sameSender={chatId === _id}
                        handleDeleteChat={handleDeleteChat}
                    />
                );
            })
        }
    </Stack>
};

export default ChatList;
