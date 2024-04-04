import React, {ElementType} from "react";
import { styled, Box, BoxProps } from "@mui/material";

interface ITemplateAppBarStyles{
    container: ElementType<BoxProps>;
    contentContainer: ElementType<BoxProps>;
}

const TemplateAppBarStyles: ITemplateAppBarStyles = {
    container : styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
    }),
    contentContainer : styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'auto',
    }),
};

export default TemplateAppBarStyles;