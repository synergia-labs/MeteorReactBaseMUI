import React from "react";
import {styled, Box } from "@mui/material";
import { sysSizing } from "/imports/ui/materialui/styles";

export const ExampleDetailStyledContainer = styled(Box)(({}) => ({
    width: "100%",
    padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: sysSizing.spacingFixedMd,
}));

export const ExampleDetailStyledHeader = styled(Box)(({}) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
}));

export const ExampleDetailStyledBody = styled(Box)(({}) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: sysSizing.contentPb,
}));

export const ExampleDetailStyledFormContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: sysSizing.spacingFixedLg,
    width: "100%",
}));

export const ExampleDetailStyledFooter = styled(Box)(({}) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: sysSizing.spacingRemMd,
}));