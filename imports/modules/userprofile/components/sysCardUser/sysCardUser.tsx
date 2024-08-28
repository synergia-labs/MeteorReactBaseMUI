import React from 'react';
import { Box, FabProps, SxProps, Theme, Typography, useTheme } from '@mui/material';
import SysCardUserStyled from './sysCardUserStyles';
import { UserProfileListControllerContext } from '/imports/modules/userprofile/pages/UserProfileList/userProfileListController';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

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
		<SysCardUserStyled.Container sx={sx} key={userId}>
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
      <Typography variant="body1" sx={{ gridArea: 'email' }}>{email}</Typography>
      <Typography color={status === 'active' ? colorPrimary : colorDisabled} variant="body1" sx={{ gridArea: 'status' }}>
        {translateStatus(status)}
      </Typography>
			<SysCardUserStyled.ActionBox>
				{status === 'active' ? (
					<>
						<SysIcon name={'doNotDisturbOn'} onClick={() => onChangeStatusClick(userId!)} />
						<SysIcon name={'edit'} onClick={() => onEdit(userId)} />
					</>
				) : (
          <SysIcon name={'checkCircle'} onClick={() => onChangeStatusClick(userId!)} />
				)}
			</SysCardUserStyled.ActionBox>
		</SysCardUserStyled.Container>
	);
};
