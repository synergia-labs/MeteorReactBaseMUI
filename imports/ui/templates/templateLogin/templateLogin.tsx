import React, { ReactNode } from 'react';
import { ISysTemplateProps } from '../getTemplate';
import Styles from './templateLoginStyles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export interface ITemplateLogin extends ISysTemplateProps {
	backgroundImagePath?: string;
	projetctLogo?: ReactNode;
	companyLogo?: ReactNode;
}

const TemplateLogin: React.FC<ITemplateLogin> = ({ backgroundImagePath, projetctLogo, companyLogo, children }) => {
	return (
		<Styles.wrapper backgroundImagePath={backgroundImagePath}>
			<Styles.container>
				{projetctLogo || (
					<Typography variant="h1" display={'inline-flex'} gap={1}>
						<Typography variant="inherit" color={(theme) => theme.palette.sysText?.tertiary}>
							{'{'}
						</Typography>
						Boilerplate
						<Typography variant="inherit" color="sysText.tertiary">
							{'}'}
						</Typography>
					</Typography>
				)}
				<Styles.dataContent>{children}</Styles.dataContent>
				{companyLogo || (
					<Box component="img" src="/images/wireframe/synergia-logo.svg" sx={{ width: '100%', maxWidth: '400px' }} />
				)}
			</Styles.container>
		</Styles.wrapper>
	);
};

export default TemplateLogin;
