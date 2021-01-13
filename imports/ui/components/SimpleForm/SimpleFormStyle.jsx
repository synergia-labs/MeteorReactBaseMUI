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

const simpleFormStyle = {
  buttonForm: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
  },
  containerLabel: {
    marginTop:5,
    width:'100%',
    marginBottom:16
  },
  containerForm: {
    width:'100%',
    marginLeft:10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
  },
  containerSubForm: {
    margin:3,
    display:'flex',
    flexDirection:'row',
  },
  containerEmptyItens: {
    color:'#BBB',
    fontSize: '15px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '0.00938em',
    paddingTop: 10,
  },
  containerAddSubForm: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'left',
    paddingLeft: '10px',
  },
  containerChildrenElements: {
    margin:3,
    marginLeft:10,
  },
  buttonAddSubForm: {
    backgroundColor: '#5a9902'
  },
};

export {
    simpleFormStyle,
};
