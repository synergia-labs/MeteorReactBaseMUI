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

const titleTextColor = '#222222';

const simpleValueStyle = {
  displayValue: {
    color:titleTextColor,
    padding:5,
    height:35,
    marginTop:4,
    marginBottom:8,

    fontSize: '11px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '0.00938em',
  },
};

export {
    simpleValueStyle,
    titleTextColor,
};
