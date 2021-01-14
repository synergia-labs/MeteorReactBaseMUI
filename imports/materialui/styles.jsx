/*!

 =========================================================
 * Material Dashboard React - v1.0.0 based on Material Dashboard - v1.2.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

import { max } from "lodash";
import {isMobile} from "/imports/libs/deviceVerify";

//Theme
const primaryColor = '#5a9902';
const secondaryColor = '#39a6fc';

//Pages
const titleTextColor = '#000000';
const titleSecondaryTextColor = '#ffffff';
const title = {
    color:titleTextColor,
    fontSize: isMobile?'20px':'30px',
    paddingTop: isMobile?'20px':'20px',
    paddingBottom: isMobile?'20px':'20px',
    fontWeight: isMobile?'500':'500',
}

const fabContainer = {
    position:'fixed',
    bottom:isMobile?80:30,
    right:30,
}

const containerHome = {
    marginTop: '2em',
}

//Messages
const warningColor = '#ff9800';
const dangerColor = '#f55a4e';
const successColor = '#4caf50';
const infoColor = '#00acc1';
const textColorMessages = '#002e07'
const textColorGray = '#999999';

//Transition
const transition = {
    transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
};

//Boxes
const boxShadow = {
    boxShadow:
        '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
};

//Button
const textButtonColor = '#FFF';

export {
    //theme
    primaryColor,
    secondaryColor,

    //pages
    titleTextColor,
    titleSecondaryTextColor,
    title,
    fabContainer,
    containerHome,

    //messages
    warningColor,
    dangerColor,
    successColor,
    infoColor,
    textColorMessages,
    textColorGray,

    //transition
    transition,

    //box
    boxShadow,

    //button
    textButtonColor,
};
