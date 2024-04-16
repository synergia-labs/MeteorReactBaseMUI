import React, { ElementType } from "react";
import { styled, Box, BoxProps } from "@mui/system";

interface INotFoundStyles {
    container: ElementType<BoxProps>;
}

const NotFoundStyles: INotFoundStyles = {
    container: styled(Box)(() => ({
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
    }))
}

export default NotFoundStyles;