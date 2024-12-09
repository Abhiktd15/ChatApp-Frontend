import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { SampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";

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
                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid 
                        item 
                        sm={4} 
                        md={3} 
                        sx={{
                            display:{xs:"none",sm:"block"}
                        }} 
                        height={"100%"} 
                    >
                        <ChatList 
                            chats={SampleChats} 
                            chatId={chatId}
                            handleDeleteChat={handleDeleteChat}
                        />
                    </Grid>

                    <Grid
                        item 
                        xs={12} 
                        sm={8} 
                        md={5}
                        lg={6} 
                        height={"100%"}
                    >
                        <WrappedComponent {...props} />
                    </Grid>
                    <Grid 
                        item
                        md={4} 
                        sx={{
                            display:{xs:"none",md:"block"},
                            padding:"2rem",
                            bgcolor:"rgba(0,0,0,0.85)",
                        }}
                        lg={3}   
                        height={"100%"} 
                    >
                        Third
                    </Grid>
                </Grid>

            </>
        );
    };
    
    return Layout;
};

export { AppLayout};
