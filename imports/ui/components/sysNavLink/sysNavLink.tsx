import React from "react";
import { IAppMenu } from "/imports/modules/modulesTypings";
import {Button, ButtonProps} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { SysNavLinkStyledContainer } from "./sysNavLinkStyles";

interface ISysNavLink extends ButtonProps{ 
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
}) => {
    const navigate = useNavigate();
    const handleClick = () => { 
        const definitivePath = path ?? sysOptions?.path;
        if (!!!definitivePath) return; 
        navigate(definitivePath);
    }

    return (
        <SysNavLinkStyledContainer active={active} onClick={handleClick}>
            {children ??
                <> 
                    {sysOptions?.icon ?? icon ?? null}
                    {text ?? sysOptions?.name ?? ""}
                </>
            }
        </SysNavLinkStyledContainer>
    );
}