import React from "react";
import { SysAppBarContainer } from "./sysAppBarStyles";
import { SysAvatar } from "/imports/ui/components/sysAvatar/sysAvatar";
import { IAppMenu } from "/imports/modules/modulesTypings";
import { Box, Button } from "@mui/material";
import { SysNavLink } from "/imports/ui/components/sysNavLink/sysNavLink";
import SysRoutes from "../../routes";
import { useNavigate } from "react-router-dom";
import { SysAppContext } from "/imports/ui/AppContainer";
export interface ISysAppBarProps{
    logo? : React.ReactNode;
    menuOptions?: (IAppMenu | null)[];
}

export const SysAppBar: React.FC<ISysAppBarProps> = ({
    logo,
    menuOptions
} : ISysAppBarProps) => {
    const {user, isLoggedIn} = React.useContext(SysAppContext);
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
                    menuOptions?.map((option, index) => {
                        if (!option) return null;
                        return (
                            <SysNavLink 
                                key={index}
                                active={SysRoutes.checkIsActiveRoute(option.path)}
                                sysOptions={option}
                            />
                        );
                    })     
                }
            </Box>
            <Box>

            </Box>
            <SysAvatar name={user?.username[0]} />
        </SysAppBarContainer>
    );
}
