import React from 'react';
import { Box, FabProps, SxProps, Theme, Typography, useTheme } from '@mui/material';
import SysCardUserStyled from './sysCardUserStyles';
import { UserProfileListControllerContext } from '/imports/modules/userprofile/pages/UserProfileList/userProfileListController';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface ISysCardUserProps extends FabProps {
	username: string;
	roles?: string[];
	email: string;
	status: string | undefined;
	userId: string;
	sx?: SxProps<Theme>;
}

export const SysCardUser: React.FC<ISysCardUserProps> = ({ ...props }: ISysCardUserProps) => {
	const context = React.useContext(UserProfileListControllerContext);
	const { translateStatus, onChangeStatusClick, onEdit } = context;
	const theme = useTheme();
	const { username, roles, email, status, userId, sx } = props;
	const colorPrimary = theme.palette.sysText?.primary;
	const colorDisabled = theme.palette.sysText?.disabled;

	return (
		<SysCardUserStyled.Container sx={sx}>
			<SysCardUserStyled.TitleBox>
				<Typography className="title" variant="subtitle1">
					{username}
				</Typography>
			</SysCardUserStyled.TitleBox>
			<SysCardUserStyled.InfoBox>
				<Box className="roles">
					{roles?.map((role) => {
						return <Typography variant="body1">{role}</Typography>;
					})}
				</Box>
				<Typography className="email" variant="body1">
					{email}
				</Typography>
				<Typography className="status" color={status === 'active' ? colorPrimary : colorDisabled} variant="body1">
					{translateStatus(status)}
				</Typography>
			</SysCardUserStyled.InfoBox>
			<SysCardUserStyled.ActionBox>
				{status === 'active' ? (
					<>
						<DoNotDisturbOnOutlinedIcon onClick={() => onChangeStatusClick(userId!)} />
						<EditOutlinedIcon onClick={() => onEdit(userId)} />
					</>
				) : (
					<>
						<Box sx={{ width: '24px', height: '24px' }} />
						<CheckCircleOutlinedIcon onClick={() => onChangeStatusClick(userId!)} />
					</>
				)}
			</SysCardUserStyled.ActionBox>
		</SysCardUserStyled.Container>
	);
};
