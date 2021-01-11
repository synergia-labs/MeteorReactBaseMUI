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

 import {isMobile} from "/imports/libs/deviceVerify";

const audioRecorderStyle = {
  containerRecord: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    marginTop:16,
    width:'100%',
    marginBottom:16,
  },
  subContainerRecord: {
    display:'flex',
    flexDirection:'row',
    justifyContent:isMobile?'center':'left',
    marginTop:16,
    width:'100%',
    marginBottom:16,
  },
  containerRecordError:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'left',
    marginTop:16,
    width:'100%',
    marginBottom:16,
    border:'1px solid red'
  },
  buttonOptions: {
    marginRight:3,
    maxHeight:40,
  },
  audioOptions:{
    maxWidth: isMobile? '182px':'200px',
    marginRight:3,
    maxHeight:40,
    paddingLeft: isMobile?5:15,
  }
};

export {
    audioRecorderStyle,
};
