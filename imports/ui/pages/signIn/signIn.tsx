import { Box, Typography } from "@mui/material";
import React from "react";
import signInStyles from "./signInStyles";

const SignInPage : React.FC = () => {
    return (
        <Box sx={signInStyles.container} >
            <Box sx={signInStyles.content}>
                <Typography variant="h1" display={'inline-flex'} gap={1}>
                    <Typography variant="h1" color='secondary'>
                    {'{'}
                    </Typography>
                    Boilerplate
                    <Typography variant="h1" color='secondary'>
                    {'}'}
                    </Typography>
                </Typography>
            </Box> {/* Content */}
        </Box> // Container
    );
};

export default SignInPage;