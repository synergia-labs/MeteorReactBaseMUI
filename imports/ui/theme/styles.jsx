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

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

/*
const titleTextColor = '#333333';
const titleSecondaryTextColor = '#222222';
const titleTerciaryTextColor = '#808080';
const titleTextColorMessage = '#4d4d4d';
*/

const appStyles = {
  title: {
      fontSize: isMobile?'20px':null,
      paddingTop: isMobile?'20px':null,
      paddingBottom: isMobile?'20px':null,
      fontWeight: isMobile?'500':null,
  },
  containerList: {
    position:'fixed',
    bottom:30,
    right:30,
  },
  containerHome: {
     marginTop: '2em',
  }
};

export {
    appStyles,
};
