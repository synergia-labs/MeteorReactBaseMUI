import React from 'react';
import { AvatarProps, SxProps, Theme, Typography } from '@mui/material';
import SysAvatarStyles from './sysAvatarStyles';
import { hasValue } from '/imports/libs/hasValue';

export interface SysAvatarProps extends Omit<AvatarProps, 'onCLick'> {
	/**O nome que será usado para mostrar a primeira letra no avatar.*/
	name?: string;
	/**Estilos personalizados para o componente Box que envolve o Avatar.*/
	backgroundSx?: SxProps<Theme>;
	/**A cor da borda do avatar.*/
	borderColor?: string;
	/**Um manipulador de eventos onClick para o componente.*/
	onClick?: (event?: any) => void;
}

/**
 * O componente `SysAvatar` é um componente React personalizado que exibe um avatar.
 * Ele é construído usando componentes do Material-UI e estilos personalizados.
 *
 * Notas:
 * - O componente `SysAvatar` é um componente React personalizado que exibe um avatar.
 * - O componente prioriza a exibição da imagem através da propriedade `src` e, caso não seja possível, exibe a primeira letra do nome através da propriedade `name`.
 */
export const SysAvatar: React.FC<SysAvatarProps> = ({ name, backgroundSx, borderColor, onClick, ...props }) => {
	return (
		<SysAvatarStyles.container
			sx={backgroundSx}
			onClick={onClick}
			activeOnClick={hasValue(onClick)}
			borderColor={borderColor}>
			<SysAvatarStyles.avatar {...props} tabIndex={0}>
				<Typography variant="h3">{name?.[0].toUpperCase()}</Typography>
			</SysAvatarStyles.avatar>
		</SysAvatarStyles.container>
	);
};
