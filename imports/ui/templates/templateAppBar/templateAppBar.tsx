import { Box, BoxProps, Typography } from '@mui/material';
import React from 'react';
import { TemplateAppBarContainer, TemplateAppBarContent } from './templateAppBarStyles';
import { SysAppBar } from '/imports/ui/templates/components/sysAppBar/sysAppBar';
import { ISysTemplateProps } from '../getTemplate';

export interface ITemplateAppBar extends ISysTemplateProps {
	containerProps?: BoxProps;
	logo?: React.ReactNode;
}

export const TemplateAppBar: React.FC<ITemplateAppBar> = ({ children, menuOptions, logo, containerProps }) => {
	return (
		<TemplateAppBarContainer {...containerProps}>
			<SysAppBar
				logo={
					<Typography
						variant="subtitle1"
						color={(theme) => theme.palette.sysText?.tertiary}
						sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
						{logo ?? (
							<>
								{'{ '}
								<Typography color={(theme) => theme.palette.primary.contrastText} variant="inherit">
									Boilerplate
								</Typography>{' '}
								{'}'}
							</>
						)}
					</Typography>
				}
				menuOptions={menuOptions}
			/>
			<TemplateAppBarContent>{children}</TemplateAppBarContent>
		</TemplateAppBarContainer>
	);
};
