import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";

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
        <Link to={`/chat/${_id}`} sx={{padding:"0"}} onContextMenu={(e) => handleDeleteChat(e,_id,groupChat)}>
            <div
                style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                backgroundColor: sameSender ? "black" : "unset",
                color: sameSender ? "white" : "unset",
                position: "relative",
                }}
            >
                {/* Avatar Card */}
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