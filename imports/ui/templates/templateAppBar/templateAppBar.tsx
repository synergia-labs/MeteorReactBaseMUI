import React from "react"
import { ISysTemplateProps } from "../getTemplate";
import { BoxProps, Typography } from "@mui/material";
import TemplateAppBarStyles from "./templateAppBarStyles";
import { SysAppBar } from "../components/sysAppBar/sysAppBar";

export interface ITemplateAppBar extends ISysTemplateProps {
	containerProps?: BoxProps;
	logo?: React.ReactNode;
}


export const TemplateAppBar: React.FC<ITemplateAppBar> = ({ children, menuOptions, logo, containerProps }) => {
	return(
		<TemplateAppBarStyles.container>
			<SysAppBar
				logo={logo ?? <BoilerplateLogo />}
				menuOptions={menuOptions}
			/>
			<TemplateAppBarStyles.contentContainer {...containerProps}>
				{children}
			</TemplateAppBarStyles.contentContainer>
		</TemplateAppBarStyles.container>
	)

}


const BoilerplateLogo : React.FC = () => {
	return(
		<Typography
			variant="subtitle1"
			color={(theme) => theme.palette.sysText?.tertiary}
			sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
		>
			{'{ '}
			<Typography color={(theme) => theme.palette.primary.contrastText} variant="inherit">
				Boilerplate
			</Typography>{' '}
			{'}'}
		</Typography>
	);
}