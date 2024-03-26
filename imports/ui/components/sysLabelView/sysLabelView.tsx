import React, {ReactNode} from "react";
import SysLabelViewStyles from "./sysLabelViewStyle";
import { SxProps, Theme, Typography } from "@mui/material";

interface ISysLabelView{
    label?: string;
    tooltipMessage?: string;
    disabled?: boolean;
    sxMap?: {
        container?: SxProps<Theme>;
        header?: SxProps<Theme>;
    }
    children?: ReactNode;
}

const SysLabelView : React.FC<ISysLabelView> = ({
    label, 
    tooltipMessage,
    sxMap,
    disabled,
    children
}) => {
    return (
        <SysLabelViewStyles.container sx={sxMap?.container}>
            {(!!label || !!tooltipMessage) && 
                <SysLabelViewStyles.header sx={sxMap?.header}>
                    <Typography 
                        variant="body2" 
                        color={theme =>  disabled ? theme.palette.sysText?.disabled : theme.palette.sysText?.auxiliary}
                    >
                        {label}
                    </Typography>    
                    {/*TODO: Adicionar o tooltip */}
                </SysLabelViewStyles.header>
            }
            {children}
        </SysLabelViewStyles.container>
    )
}


export default SysLabelView;