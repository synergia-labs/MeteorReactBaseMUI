import React from "react";
import { Box, styled } from "@mui/material";
import { sysSizing } from "/imports/ui/materialui/styles";

interface IUserProfileDetailStyles {
    FieldsForm: React.ElementType;
    Actions: React.ElementType;
}

const UserProfileDetailStyles: IUserProfileDetailStyles = {
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
    })),

}

export default UserProfileDetailStyles;