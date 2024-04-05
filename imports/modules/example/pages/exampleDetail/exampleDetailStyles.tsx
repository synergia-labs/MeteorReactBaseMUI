import React, { ElementType } from "react";
import { styled, Box, BoxProps } from "@mui/material";
import { sysSizing } from "/imports/ui/materialui/styles";

interface IExampleDetailStyles {
    container: ElementType<BoxProps>;
    header: ElementType<BoxProps>;
    body: ElementType<BoxProps>;
    footer: ElementType<BoxProps>;
    formColumn: ElementType<BoxProps>;
}

const ExampleDetailStyles: IExampleDetailStyles = {
    container: styled(Box)(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
        paddingBottom: sysSizing.contentPb,
        gap: sysSizing.spacingFixedMd,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: sysSizing.spacingFixedMd,
            paddingRight: sysSizing.spacingFixedMd
        }
    })),
    header: styled(Box)({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    }),
    body: styled(Box)({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        gap: '64px'
    }),
    footer: styled(Box)({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        gap: sysSizing.spacingRemMd
    }),
    formColumn: styled(Box)({
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: sysSizing.spacingFixedLg
    })
}

export default ExampleDetailStyles;