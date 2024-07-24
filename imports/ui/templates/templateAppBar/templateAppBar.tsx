import React from 'react';
import { ISysTemplateProps } from '../getTemplate';
import { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TemplateAppBarStyles from './templateAppBarStyles';
import { SysAppBar } from '../components/sysAppBar/sysAppBar';


const { Container, ContentContainer } = TemplateAppBarStyles;

export interface ITemplateAppBar extends ISysTemplateProps {
	containerProps?: BoxProps;
	logo?: React.ReactNode;
}

export const TemplateAppBar: React.FC<ITemplateAppBar> = ({ children, menuOptions, logo, containerProps }) => {
	return (
		<Container>
			<SysAppBar logo={logo ?? <BoilerplateLogo />} menuOptions={menuOptions} />
			<ContentContainer {...containerProps}>{children}</ContentContainer>
		</Container>
	);
};

const BoilerplateLogo: React.FC = () => {
	return (
		<Typography
			variant="subtitle1"
			color={(theme) => theme.palette.sysText?.tertiary}
			sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
			{'{ '}
			<Typography color={(theme) => theme.palette.primary.contrastText} variant="inherit">
				Boilerplate
			</Typography>{' '}
			{'}'}
		</Typography>
	);
};
