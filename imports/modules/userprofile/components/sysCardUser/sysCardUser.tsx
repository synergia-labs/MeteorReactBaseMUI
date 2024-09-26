import React from 'react';
import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SysCardUserStyled from './sysCardUserStyles';
import { UserProfileListControllerContext } from '../../pages/UserProfileList/userProfileListController';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';

interface ISysCardUserProps {
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
	const { username, roles, email, status, userId, sx } = props;

	const { Container, ActionBox, Status } = SysCardUserStyled;

	return (
		<Container sx={sx} key={userId}>
			<Typography sx={{ gridArea: 'name' }} variant="subtitle1">
				{username}
			</Typography>
			<Box sx={{ gridArea: 'roles' }}>
				{roles?.map((role) => {
					return (
						<Typography key={role} variant="body1">
							{role}
						</Typography>
					);
				})}
			</Box>
			<Typography variant="body1" sx={{ gridArea: 'email' }}>
				{email}
			</Typography>
			<Status color={status === 'active' ? 'primary.main' : 'sysText.disabled'} variant="body1">
				{translateStatus(status)}
			</Status>
			<ActionBox>
				{status === 'active' ? (
					<>
						<Tooltip title={'Destivar'}>
							<IconButton onClick={() => onChangeStatusClick(userId!)}>
								<SysIcon name={'doNotDisturbOn'} />
							</IconButton>
						</Tooltip>
						<Tooltip title={'Editar'}>
							<IconButton onClick={() => onEdit(userId)}>
								<SysIcon name={'edit'} />
							</IconButton>
						</Tooltip>
					</>
				) : (
					<Tooltip title={'Ativar'}>
						<IconButton onClick={() => onChangeStatusClick(userId!)}>
							<SysIcon name={'checkCircle'} />
						</IconButton>
					</Tooltip>
				)}
			</ActionBox>
		</Container>
	);
};
