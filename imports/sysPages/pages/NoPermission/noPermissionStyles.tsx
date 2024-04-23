import { ElementType } from 'react';
import { Box, BoxProps, styled } from '@mui/system';

interface INoPermissionStyles {
	container: ElementType<BoxProps>;
}

const NoPermissionStyles: INoPermissionStyles = {
	container: styled(Box)(() => ({
		display: 'flex',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		padding: '20px'
	}))
};

export default NoPermissionStyles;
