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

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

const simpleFormStyle: {
	[key: string]: { [subkey: string]: React.CSSProperties } | React.CSSProperties;
} = {
	buttonForm: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	containerLabel: {
		marginTop: 5,
		width: '100%',
		marginBottom: 16
	},
	containerForm: {
		width: '100%',
		marginLeft: 0,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'left'
		// border: '1px solid #CCCCCC',
		// boxSizing: 'border-box',
		// borderRadius: ' 4px',
	},
	containerSubForm: {
		display: 'flex',
		flexDirection: 'row'
	},
	containerEmptyItens: {
		color: '#BBB'
	},
	containerAddSubForm: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingLeft: '10px'
	},
	containerChildrenElements: {
		margin: 0
	},
	buttonAddSubForm: {
		backgroundColor: '#5a9902'
	}
};

export { simpleFormStyle };
