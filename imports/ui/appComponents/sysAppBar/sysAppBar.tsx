import React from "react";
import { SysAppBarContainer } from "./sysAppBarStyles";
import { SysAvatar } from "/imports/ui/components/sysAvatar/sysAvatar";
import { IAppMenu } from "/imports/modules/modulesTypings";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { SysNavLink } from "/imports/ui/components/sysNavLink/sysNavLink";
import SysRoutes from "../../../app/routes";
import { useNavigate } from "react-router-dom";
import { SysAppContext } from "/imports/app/AppContainer";
import { SysMenu } from "/imports/ui/components/sysMenu/sysMenu";
export interface ISysAppBarProps{
    logo? : React.ReactNode;
    menuOptions?: (IAppMenu | null)[];
}

export const SysAppBar: React.FC<ISysAppBarProps> = ({
    logo,
    menuOptions
} : ISysAppBarProps) => {
    const {user, isLoggedIn} = React.useContext(SysAppContext);
    const [anchorEl, setAnchorEl] = React.useState<Object | null>(null);
    const navigate = useNavigate();

    const handleMenu = (event: React.SyntheticEvent) => {
		setAnchorEl(event.currentTarget);
	};

    const handleClose = () => {
		setAnchorEl(null);
	};


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
            <SysAvatar name={user?.username[0]} onClick={handleMenu} />
            <SysMenu  anchorEl={anchorEl} handleClose={handleClose}/>
        </SysAppBarContainer>
    );
}
