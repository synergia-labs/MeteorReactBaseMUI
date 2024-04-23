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

const uploadImagesStyle = {
	banner: {
		width: '100%',
		height: '25vh',
		position: 'relative',
		paddingLeft: '6%'
	},
	selectImage: {
		cursor: 'pointer',
		fontSize: '12px',
		// fontFamily: '"PT"',
		fontWeight: 400,
		lineHeight: 1,
		letterSpacing: '0.00938em',
		color: 'rgba(108, 104, 104)'
	},
	cardMedia: {
		position: 'relative',
		backgroundColor: '#FFF',
		minWidth: 255,
		minHeight: 200,
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	media: {
		margin: 10,
		position: 'relative',
		backgroundColor: '#FFF',
		minWidth: 255,
		minHeight: 200,
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		overflow: 'hidden',
		transition: '300ms',
		cursor: 'pointer'
	},
	mediaCaption: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		bottom: 0,
		position: 'absolute',
		textOverflow: 'ellipsis',
		backgroundColor: 'black',
		color: '#FFF',
		opacity: 0.8,
		width: '100%',
		maxWidth: '100%',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		minHeight: '15%',
		fontSize: 15,
		fontWeight: 200,
		transition: '300ms',
		cursor: 'pointer',
		padding: 8
	},
	caption: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		maxWidth: '100%',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		color: '#FFF',
		fontSize: 15,
		fontWeight: 200
	},
	delete: {
		marginRight: 8,
		color: '#FFF'
	},
	download: {
		color: '#FFF'
	},
	expand: {
		color: '#FFF',
		position: 'absolute',
		right: 0
	},
	bannerGrid: {
		backgroundColor: 'dark red',
		color: '#FFF',
		height: '100%',
		position: 'relative',
		cursor: 'pointer',
		padding: '1%',
		transition: '300ms'
	},
	containerEmptyImages: {
		color: '#BBB'
	},
	containerListReadOnly: {
		padding: '0px 8px'
	},
	containerNoFiles: {
		color: '#BBB'
	},
	containerDropzone: {
		width: '100%',
		padding: '2rem',
		textAlign: 'center',
		cursor: 'pointer'
	},
	containerStatusUpload: {
		width: '100%'
	},
	containerUploadFiles: {
		flex: 1,
		flexDirection: 'column',
		marginBottom: 8,
		display: 'flex',
		alignItems: 'center'
	},
	containerShowFiles: {
		width: '100%'
	},
	subContainerShowFiles: {
		padding: 10,
		backgroundColor: '#EEE'
	},
	containerGetConteudoDropzone: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	containerGetListFiles: {
		padding: '0.5rem',
		borderRadius: 10,
		borderStyle: 'groove',
		boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
	}
};

export { uploadImagesStyle };
