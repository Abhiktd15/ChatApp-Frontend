import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Box, Grid, Typography } from "@mui/material";
import ChatList from "../specific/ChatList";
import { samepleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { grayColor } from "../../constants/color";

const AppLayout =  (WrappedComponent) => {
    const handleDeleteChat = (e,_id,groupChat) => {
        e.preventDefault();
        console.log("Delete Chat: ",_id,groupChat)
    }
    const Layout = (props) => {
        const params = useParams()
        const chatId = params.chatId
        return (
            <>
                <Title />
                <Header />
                <Grid container height={"calc(100vh - 4rem)"} bgcolor={grayColor}>
                    <Grid 
                        item 
                        sm={4} 
                        md={3} 
                        sx={{
                            display:{xs:"none",sm:"block"},
                        }} 
                        height={"100%"} 
                        padding={"1rem 0 1rem 1rem"}
                    >
                        <Box
                            width="100%"
                            bgcolor="white"
                            boxShadow="0 8px 12px rgba(0,0,0,0.2)"
                            borderRadius="15px"
                            textAlign="center"
                            height={"100%"}
                        >
                            <Typography textAlign={"center"} p={"1rem"} variant="h6" fontWeight={"600"} color={"Black"}>Chats</Typography>
                            <ChatList 
                                chats={samepleChats} 
                                chatId={chatId}
                                handleDeleteChat={handleDeleteChat}
                            />
                        </Box>
                    </Grid>

                    <Grid
                        item 
                        xs={12} 
                        sm={8} 
                        md={5}
                        lg={6} 
                        height={"100%"}
                        padding={"1rem 1rem"}
                    >
                        <WrappedComponent {...props} />
                    </Grid>
                    <Grid 
                        item
                        md={4} 
                        sx={{
                            display:{xs:"none",md:"block"},
                            bgcolor:grayColor,
                        }}
                        
                        padding={"1rem 1rem 1rem 0"}
                        lg={3}   
                        height={"100%"} 
                    >
                        <Box
                            width="100%"
                            bgcolor="black"
                            boxShadow="0 8px 12px rgba(0,0,0,0.2)"
                            borderRadius="15px"
                            textAlign="center"
                            height={"100%"}
                        >
                            <Profile/>
                        </Box>
                    </Grid>
                </Grid>

            </>
        );
    };
    
    return Layout;
};

export { AppLayout};
