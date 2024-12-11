import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
        avatar = [],
        name,
        _id,
        groupChat = false,
        sameSender,
        isOnline,
        newMessageAlert,
        index = 0,
        handleDeleteChat,
    }) => {
    return (
        <Link to={`/chat/${_id}`} sx={{padding:"1px 10px 1px 10px"}} onContextMenu={(e) => handleDeleteChat(e,_id,groupChat)}>
            <div
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.1)";
                    e.currentTarget.style.color = "black"; // Optional: change text color
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = sameSender ? "rgba(0,0,0,0.5)" : "unset";
                    e.currentTarget.style.color = sameSender ? "white" : "unset";
                }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius:'45px',
                    gap: "1rem",
                    padding: "0.5rem 0.7rem",
                    backgroundColor: sameSender ? " rgba(0,0,0,0.5)" : "unset",
                    color: sameSender ? "white" : "unset",
                    position: "relative",
                }}
            >
                {/* Avatar Card */}
                <AvatarCard avatar={avatar}/>
                <Stack>
                    <Typography>{name}</Typography>
                    {newMessageAlert && (
                        <Typography>{newMessageAlert.count} New Message</Typography>
                    )}
                </Stack>

                {/* Online Indicator */}
                {isOnline && (
                    <Box sx={{
                        width:'10px',
                        height:'10px',
                        borderRadius: "50%",
                        backgroundColor: "green",
                        position: "absolute",
                        top: "50%",
                        right:"1rem",
                        transform: "translateY(-50%)",
                    }} >

                    </Box>
                )}

            </div>
        </Link>
    );
};
const ChatItems = memo(ChatItem)
export default ChatItems;
