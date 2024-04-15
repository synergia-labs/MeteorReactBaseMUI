import React from "react";
import { IAppMenu } from "/imports/modules/modulesTypings";
import {BoxProps, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SysNavLinkStyles  from "./sysNavLinkStyles";

interface ISysNavLink extends BoxProps{ 
    sysOptions?: IAppMenu;
    active?: boolean;
    text?: string;
    icon?: React.ReactNode;
    path?: string;
    children?: React.ReactNode;
}

export const SysNavLink: React.FC<ISysNavLink> = ({
    sysOptions,
    active = false,
    text,
    icon,
    path,
    children,
    ...props
}) => {
    const navigate = useNavigate();
    
    const handleClick = () => { 
        if(active) return;
        const definitivePath = path ?? sysOptions?.path;
        if (!!!definitivePath) return; 
        navigate(definitivePath);
    }

    return (
        <SysNavLinkStyles.container {...props} active = {active} onClick={handleClick}>
            {children ??
                <> 
                    {sysOptions?.icon ?? icon ?? null}
                    <Typography variant="button2">
                        {text ?? sysOptions?.name ?? ""}
                    </Typography>
                </>
            }
        </SysNavLinkStyles.container>
    );
}