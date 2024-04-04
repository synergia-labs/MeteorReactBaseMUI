import React, { ReactNode, useContext, useState } from "react";
import SysAppBarStyles  from "./sysAppBarStyles";
import { SysAvatar } from "/imports/ui/components/sysAvatar/sysAvatar";
import { IAppMenu } from "/imports/modules/modulesTypings";
import { useNavigate } from "react-router-dom";
import { SysAppContext } from "/imports/app/AppContainer";
import { SysMenu } from "/imports/ui/components/sysMenu/sysMenu";
import { SysNavLink } from "/imports/ui/components/sysNavLink/sysNavLink";
import SysRoutes from "/imports/app/routes";
import { Box } from "@mui/material";
export interface ISysAppBarProps{
    logo? : ReactNode;
    menuOptions?: (IAppMenu | null)[];
}

export const SysAppBar: React.FC<ISysAppBarProps> = ({
    logo,
    menuOptions
} : ISysAppBarProps) => {
    const { user } = useContext(SysAppContext);
    const [anchorEl, setAnchorEl] = useState<Object | null>(null);
    const navigate = useNavigate();

    const handleMenu = (event: React.SyntheticEvent) => {
		setAnchorEl(event.currentTarget);
	};

    const handleClose = () => {
		setAnchorEl(null);
	};

    const onLogoClick = () => navigate('/');
    

    return (
        <SysAppBarStyles.container>
            <Box sx={{cursor: 'pointer'}} onClick={onLogoClick}>
                {logo}
            </Box>
            <SysAppBarStyles.navContainer>
                {
                    menuOptions?.map((option, index) => !!!option ? null : 
                        <SysNavLink 
                            key={index} 
                            active={SysRoutes.checkIsActiveRoute(option.path)}
                            sysOptions={option} 
                        />
                    )
                }
            </SysAppBarStyles.navContainer>
            <SysAvatar name={user?.username[0]} onClick={handleMenu} />
            <SysMenu  anchorEl={anchorEl} handleClose={handleClose}/>
        </SysAppBarStyles.container>
    );
}
