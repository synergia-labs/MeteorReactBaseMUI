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

import {secondary} from '/imports/ui/materialui/styles';

const backgroundColor = 'rgba(255,255,255,0.3)';
const uploadFilesStyle: {
	[key: string]: { [key: string]: React.CSSProperties } | React.CSSProperties;
} = {
	iconBackgroundColor: backgroundColor,
	containerList: {
		padding: '0px 8px'
	},
	containerListReadOnly: {
		width: '100%',
		borderRadius: 4,
		boxShadow: '0px 1px 4px 1px rgba(0, 0, 0, 0.25)',
		backgroundColor: backgroundColor,
		color: secondary
	},
	containerNoFiles: {
		maxWidth: '75%',
		padding: '0.15rem',
		color: secondary
	},
	containerDropzone: {
		width: '100%',
		padding: '1rem 2rem',
		textAlign: 'center',
		cursor: 'pointer'
	},
	containerStatusUpload: {
		width: '100%'
	},
	containerUploadFiles: {
		flex: 1,
		flexDirection: 'column',
		width: '100%'
	},
	containerShowFiles: {
		width: '100%'
	},
	subContainerShowFiles: {
		// padding: 10,
		// backgroundColor: '#EEE',
	},
	containerGetConteudoDropzone: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
		backgroundColor: backgroundColor,
		color: secondary
	},
	containerGetListFiles: {
		borderRadius: 4,
		margin: '0.2rem 0rem',
		boxShadow: '0px 1px 4px 1px rgba(0, 0, 0, 0.25)',
		backgroundColor: backgroundColor,
		color: secondary
	}
};

export { uploadFilesStyle };
