import React from "react";
import { SysAppBarContainer } from "./sysAppBarStyles";
import { SysAvatar } from "/imports/ui/components/sysAvatar/sysAvatar";
import { IAppMenu } from "/imports/modules/modulesTypings";
import { Box } from "@mui/material";
import { SysNavLink } from "/imports/ui/components/sysNavLink/sysNavLink";
import { useLocation } from "react-router-dom";

export interface ISysAppBarProps{
    logo? : React.ReactNode;
    menuOptions?: (IAppMenu | null)[];
}

export const SysAppBar: React.FC<ISysAppBarProps> = ({
    logo,
    menuOptions
} : ISysAppBarProps) => {
    const location = useLocation().pathname;
    const activeRoute = menuOptions?.find(option => option?.path === location) ?? menuOptions?.find(option => option?.path?.startsWith(location));

    return (
        <SysAppBarContainer>
            {logo}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
                marginLeft: 'auto',
            
            }}>
                {
                    menuOptions?.map((option) => {
                        if (!!!option) return null;
                        return (
                            <SysNavLink 
                                active={option?.path === activeRoute?.path}
                                sysOptions={option}
                            />
                        );
                    })     
                }
            </Box>
            <SysAvatar name="J" />
        </SysAppBarContainer>
    );
}