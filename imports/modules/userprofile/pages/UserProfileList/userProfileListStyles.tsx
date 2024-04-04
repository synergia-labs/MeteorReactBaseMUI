import React from "react";
import { Box, styled } from "@mui/material";
import { sysSizing } from "/imports/ui/materialui/styles";

interface IUserProfileListViewStyled {
    Container: React.ElementType;
    Filters: React.ElementType;
    FieldsForm: React.ElementType;
}

const UserProfileListViewStyled: IUserProfileListViewStyled = {
    Container: styled(Box)(() => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
        gap: sysSizing.spacingFixedMd,
    })),
    Filters: styled(Box)(() => ({
        display: 'flex',
        gap: sysSizing.spacingFixedMd,
        alignItems: 'flex-end',
        width: '100%',
        maxWidth: '616px',
        marginBottom: sysSizing.spacingFixedMd,
    })),
    FieldsForm: styled(Box)(() => ({
        display: 'flex',
        gap: sysSizing.spacingFixedMd,
        flexDirection: 'column'
    })),
}

export default UserProfileListViewStyled;