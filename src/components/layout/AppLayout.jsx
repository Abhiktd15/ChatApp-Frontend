import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";

const AppLayout = () => (WrappedComponent) => {
    const layout = (props) => {
        return (
            <div>
                <Title />
                <Header />
                <Grid container height={"calc(100vh-4rem)"}>
                    <Grid item xs={4} height={"100%"} bgcolor="primary.main">FIRST</Grid>
                    <Grid item xs={4} height={"100%"} bgcolor="primary.main">
                        <WrappedComponent {...props} />
                    </Grid>
                    <Grid item xs={4} height={"100%"} bgcolor="primary.main">THIRD</Grid>
                </Grid>

            </div>
        );
    };
    
    return layout;
};

export { AppLayout};
