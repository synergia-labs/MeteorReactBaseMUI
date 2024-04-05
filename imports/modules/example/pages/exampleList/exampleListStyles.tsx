import React, { ElementType } from "react";
import {Box, BoxProps, styled} from "@mui/material";
import { sysSizing } from "/imports/ui/materialui/styles";


interface IExampleListStyles {
    container: ElementType<BoxProps>;
}

const ExampleListStyles: IExampleListStyles = {
    container: styled(Box)(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
        gap: sysSizing.spacingFixedMd,
        transition: 'all 0.3s ease',
        [theme.breakpoints.down('sm')]: {
            padding: `${sysSizing.contentPt} ${sysSizing.spacingFixedMd}`,
        }
    }))
}

export default ExampleListStyles;