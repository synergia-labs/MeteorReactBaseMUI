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

import {isMobile} from '/imports/libs/deviceVerify';

const audioRecorderStyle = {
	containerRecord: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		marginTop: 16,
		width: '100%',
		marginBottom: 16
	},
	subContainerRecord: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'left',
		marginTop: 16,
		width: '100%',
		marginBottom: 16
	},
	containerRecordError: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'left',
		marginTop: 16,
		width: '100%',
		marginBottom: 16,
		border: '1px solid red'
	},
	containerEmptyAudio: {
		color: '#BBB'
	},
	buttonOptions: {
		marginRight: 3,
		maxHeight: 40
	},
	audioOptions: {
		marginRight: 3,
		maxHeight: 40,
		paddingLeft: isMobile ? 5 : 15,
		maxWidth: isMobile ? '200px' : '220px'
	},
	buttonCountOptions: {
		marginRight: 3,
		maxHeight: 40,
		maxWidth: '80px',
		width: '80px',
		height: 40,
		borderRadius: '15px',
		backgroundColor: '#5a9902',
		color: '#FFF',
		marginLeft: '10px',
		paddingLeft: 10,
		paddingRight: 10
	}
};

export { audioRecorderStyle };
