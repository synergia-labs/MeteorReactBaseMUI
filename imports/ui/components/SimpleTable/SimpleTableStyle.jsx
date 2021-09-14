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
import * as appStyles from '/imports/materialui/styles';
import {isMobile} from "/imports/libs/deviceVerify";

const simpleTableStyle = {
  containerRenderType: {
    maxHeight: 70,
    maxWidth: 80,
  },
  tableBox: {
    boxSizing: 'border-box',
  },
  tableHeadCell: {
    textAlign: 'flex-start',
    fontSize: '0.75rem',
    padding: '5px',
    color: '#FFF',
    backgroundColor: appStyles.primaryColor,
  },
  tableCell: {
    textAlign: 'flex-start',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tableCellActions: {
    textAlign: 'center',
    width: isMobile?'100%':80,
    maxWidth: isMobile?'100%':80,
  },
  spanHead: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
};

export {
  simpleTableStyle,
};
