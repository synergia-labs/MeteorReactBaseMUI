import React, {ElementType} from "react";
import {styled, Box, BoxProps} from "@mui/material";

interface ISysLabelViewStyles{
    container: ElementType<BoxProps>;
    header: ElementType<BoxProps>;
}

const SysLabelViewStyles: ISysLabelViewStyles = {
    container: styled(Box)(() => ({
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '4px',
    })),
    header: styled(Box)(() => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    })),
}

export default SysLabelViewStyles;