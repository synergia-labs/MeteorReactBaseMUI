import React from "react";
import { Box, styled } from "@mui/material";
import { sysSizing } from "/imports/ui/materialui/styles";

interface IUserProfileDetailStyles {
    Container: React.ElementType;
    FieldsForm: React.ElementType;
    Actions: React.ElementType;
}

const UserProfileDetailStyles: IUserProfileDetailStyles = {
    Container: styled(Box)(() => ({
        display: 'flex', 
        flexDirection: 'column', 
        gap: sysSizing.spacingFixedLg,
        width: '540px',
        padding: sysSizing.spacingFixedLg,
    })),
    FieldsForm: styled(Box)(() => ({
        display: 'flex',
        gap: sysSizing.spacingFixedMd,
        flexDirection: 'column'
    })),
    Actions: styled(Box)(() => ({
        display: 'flex',
        flexDirection: 'row',
        gap: sysSizing.spacingRemMd,
        padding: 0,
        justifyContent: 'flex-end',
    })),

}

export default UserProfileDetailStyles;