import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface ISysTextFieldProps extends Omit<TextFieldProps, 'variant'> {
    name: string;
}