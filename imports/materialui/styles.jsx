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

import { max } from 'lodash';
import { isMobile } from '/imports/libs/deviceVerify';

const primaryColor = '#5a9902';
const secondaryColor = '#3e6b01';

//Background Color
const systemBackgroundColor = '#eeeeee';
const pageBackgroundColor = '#FFF';

// Pages
const titleTextColor = '#000000';
const titleSecondaryTextColor = '#858585';
const title = {
  color: titleTextColor,
  fontSize: isMobile ? '16px' : '30px',
  paddingTop: isMobile ? '20px' : '20px',
  paddingBottom: isMobile ? '30px' : '40px',
  fontWeight: isMobile ? '800' : '800',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 632.3,
  height: 54.5,
  margin: '0px 96.3px 44.2px 0px',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 1.67,
  letterSpacing: 0.9,
  textAlign: 'left',
  textTransform: 'none',
};

const subtitle = {
  color: titleSecondaryTextColor,
  fontSize: isMobile ? '15px' : '25px',
  paddingTop: isMobile ? '20px' : '20px',
  paddingBottom: isMobile ? '30px' : '30px',
  fontWeight: isMobile ? '100' : '100',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const subtituloInfoComplementar = {
  margin: isMobile ? '30px 0px 16px 20px' : '50.6px 47.2px 16.2px 0.6px',
  fontSize: isMobile ? '14px' : '20px',
  fontWeight: 'normal',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 1.2,
  letterSpacing: '0.7px',
  textAlign: 'left',
  color: '#858585',
};

const avisoFinalPag = {
  width: '100%',
  minHeight: 300,
  display: 'flex',justifyContent: 'center', alignItems: 'center',
  backgroundColor: '#dcd9d5',
};

const fabContainer = {
  position: 'fixed',
  bottom: isMobile ? 80 : 30,
  right: 30,
};

const containerHome = {
  marginTop: '2em',
};

const formGroup = {
  width:'100%',
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  justifyContent: 'space-between',
  padding: isMobile ? '0 20px' : 'none',
};

const formGroup2 = {
  width:'70%',
  maxWidth: '70%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const row = {
  display: 'flex',
  flexDirection:'row',
  flexWrap:'wrap',
};

const form = {
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 20,//isMobile ? 40 : 40,
  marginBottom: 40,
  paddingBottom: 100,
};

const logo = {
  maxWidth: 100,
};

const column = {
  flex: 0.5,
};

const fieldContainer = {
  flex:1,
  padding: 4,
  paddingBottom:0,
}
// Messages
const warningColor = '#ff9800';
const dangerColor = '#f55a4e';
const successColor = '#4caf50';
const infoColor = '#00acc1';
const textColorMessages = '#002e07';
const textColorGray = '#999999';

// Transition
const transition = {
  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
};

// Boxes
const boxShadow = {
  boxShadow:
        '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
};

// Button
const textButtonColor = '#FFF';

export {
  // theme
  primaryColor,
  secondaryColor,

    //Backgorund colors
  systemBackgroundColor,
  pageBackgroundColor,

  // pages
  titleTextColor,
  titleSecondaryTextColor,
  title,
  subtituloInfoComplementar,
  fabContainer,
  containerHome,

  // messages
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  textColorMessages,
  textColorGray,

  //two column
  row,
  column,

  //form
  form,

  logo,

  //form group
  formGroup,
  formGroup2,

  // transition
  transition,

  // box
  boxShadow,

  // button
  textButtonColor,

  fieldContainer,

  avisoFinalPag,
};
