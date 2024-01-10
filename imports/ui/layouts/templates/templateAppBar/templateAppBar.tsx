import { Box, BoxProps, Typography } from "@mui/material";
import React from "react";
import { TemplateAppBarContainer, TemplateAppBarContent } from "./templateAppBarStyles";
import { SysAppBar } from "../../components/sysAppBar/sysAppBar";

export interface ITemplateAppBar{
    children?: React.ReactNode;
    containerProps?: BoxProps;
    logo?: React.ReactNode;
} 

export const TemplateAppBar: React.FC<ITemplateAppBar> = ({
    children,
    logo,
    containerProps,
}) => {
    return (
        <TemplateAppBarContainer {...containerProps}>
            <SysAppBar 
                logo={
                    <Typography variant="subtitle1">
                        {logo ?? 'Boilerplate Synergia'}
                    </Typography>
                }
            />
            <TemplateAppBarContent>
                {children}
            </TemplateAppBarContent>
        </TemplateAppBarContainer>
    );
} 