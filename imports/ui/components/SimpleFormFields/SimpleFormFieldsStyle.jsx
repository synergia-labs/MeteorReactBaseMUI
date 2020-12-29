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
const drawerWidth = 260;

const primaryColor = '#74B9FF';
const primaryColorVariant = '#a6c155';

const secondaryColor = '#7E4DC1';
const secondaryColorVariant = '#95a489';
*/

const titleTextColor = '#222222';

/*
const titleSecondaryTextColor = '#222222';
const titleTerciaryTextColor = '#808080';
const titleTextColorMessage = '#4d4d4d';

const backgroundSiteColor = '#74B9FF';
const backgroundSecondarySiteColor = '#5688FF';
const backgroundPageColor = '#E6E6E6';

const dateColor = '#FFEAA8';

const tableTitleBackground = '#671B0B';
const warningColor = '#FFEAA8';
const dangerColor = '#FF7777';
const successColor = '#578BBF';
const infoColor = '#00acc1';
const roseColor = '#e91e63';
const grayColor = '#999999';

const textColorMessages = '#222222';
const textColorGray = '#808080';
*/
const simpleFormFieldsStyles = {
  displayValueViewMode: {
    color:titleTextColor,
    padding:5,
    height:35,
    marginTop:4,
    marginBottom:8,
  },
  displayLabelViewMode: {
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 0,
    fontSize: '1rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '0.00938em',
  },
  containerUploadFiles:{
    padding: '0px 8px',  
  }
};

export {
    simpleFormFieldsStyles,
    titleTextColor,
};
