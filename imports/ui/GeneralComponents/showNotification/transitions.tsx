import React from "react";
import { Grow, GrowProps, Slide, SlideProps } from "@mui/material";
import Fade from '@mui/material/Fade';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

function GrowTransition(props: GrowProps) {
    return <Grow {...props} />;
}

function FadeTransition(props: any) {
    return <Fade {...props} />;
}

function ShowNotificationTransition(type: 'slide' | 'grow' | 'fade') {
    switch (type) {
        case 'slide':
            return SlideTransition;
        case 'grow':
            return GrowTransition;
        case 'fade':
            return FadeTransition;
        default:
            return FadeTransition;
    }
}

export default ShowNotificationTransition;