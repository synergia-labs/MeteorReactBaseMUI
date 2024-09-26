import React from 'react';
import { IShowNotificationProps } from '../showNotification';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';

interface IShowNotificationChatProps {
	// Métodos obrigatórios para toda notificação personalizada
	showNotification: (options?: IShowNotificationProps) => void;
	closeNotification: (
		event?: React.SyntheticEvent | Event,
		reason?: string,
		callBack?: (event?: React.SyntheticEvent | Event, reason?: string) => void
	) => void;

	// Métodos e atributos personalizados
	userName: string;
	message: string;
	avatar?: string;
	duration?: number;
}

function ShowNotificationChat({
	showNotification,
	closeNotification,
	userName,
	message,
	avatar,
	duration
}: IShowNotificationChatProps) {
	const showAvatar = avatar ? avatar : userName[0].toUpperCase();

	showNotification({
		horizontal: 'right',
		duration: duration,
		children: (
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					borderRadius: '8px',
					border: '1px solid #ccc',
					padding: '6px 24px',
					paddingRight: '12px'
				}}>
				<Avatar sx={{ mr: 2 }}>{showAvatar}</Avatar>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Typography variant="subtitle1">{userName}</Typography>
					<Typography variant="body2">{message}</Typography>
				</Box>
				<IconButton
					onClick={() => closeNotification()}
					sx={{
						alignSelf: 'flex-start'
					}}>
					<SysIcon name={'close'} />
				</IconButton>
			</Box>
		)
	});
}

export default ShowNotificationChat;

/* Como usar ?
import React from 'react';
import ShowNotificationChat from '/imports/ui/appComponents/showNotification/custom/chatTile';
import { SysAppLayoutContext } from '/imports/ui/layouts/AppLayout';

const MeuComponente = () => {
    const {showNotification, closeNotification} = React.useContext(SysAppLayoutContext);

    return(
        <Button onClick={() => {
            ShowNotificationChat({
                showNotification,
                closeNotification,
                userName: 'Usuário',
                message: 'Mensagem',
            });
        }} >
            Teste de Notificação personalizada
        </Button>
    );
}


*/
