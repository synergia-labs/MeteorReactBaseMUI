import React from "react";
import { Box, styled } from "@mui/material";
import { sysSizing } from "/imports/materialui/styles";

const Container = styled(Box)(({}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '2.5rem',
    width: '100%',
    padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
    paddingBottom: '100px',
}));

const Header = styled(Box)(({}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '1rem',
    marginBottom: '1rem',
}));

const RowButtons = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '0.5rem',
    flexWrap: 'wrap',
    rowGap: '0.8rem',
    [theme.breakpoints.down('lg')]: {
        justifyContent: 'space-around',
    },
    [theme.breakpoints.down('sm')]: {
        columnGap: '1rem',
    }
}));

export {
    Container as HomePageContainer,
    Header as HomePageHeader,
    RowButtons as HomePageRowButtons,
}