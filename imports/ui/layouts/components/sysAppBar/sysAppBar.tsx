import React from "react";
import { SysAppBarContainer } from "./sysAppBarStyles";
import { SysAvatar } from "/imports/ui/components/sysAvatar/sysAvatar";

export interface ISysAppBarProps{
    logo? : React.ReactNode;
}

export const SysAppBar: React.FC<ISysAppBarProps> = ({
    logo
} : ISysAppBarProps) => {
    return (
        <SysAppBarContainer>
            {logo}
            <SysAvatar name="J" />
        </SysAppBarContainer>
    );
}