import React from 'react';
import { BoxProps, AvatarProps, Typography, Menu, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SysAppContext } from '../../../app/AppContainer';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { StyledSysMenu } from './sysMenuStyles';
import * as appStyles from '/imports/ui/materialui/styles';
import { cleanUserCache } from '/imports/hooks/useUserAccount';
import { Meteor } from 'meteor/meteor';

export interface SysMenuProps {
	/**O nome que será usado para mostrar a primeira letra no avatar.*/
	name?: string;
	/**Estilos personalizados para o componente Box que envolve o Avatar.*/
	backgroundSx?: BoxProps['sx'];
	/**A cor da borda do avatar.*/
	borderColor?: string;
	/**Um manipulador de eventos onClick para o componente.*/
	onClick?: (event?: any) => void;
    anchorEl: any;
    handleClose: any;
}

/**
 * O componente `SysAvatar` é um componente React personalizado que exibe um avatar.
 * Ele é construído usando componentes do Material-UI e estilos personalizados.
 *
 * Notas:
 * - O componente `SysAvatar` é um componente React personalizado que exibe um avatar.
 * - O componente prioriza a exibição da imagem através da propriedade `src` e, caso não seja possível, exibe a primeira letra do nome através da propriedade `name`.
 */
export const SysMenu: React.FC<SysMenuProps> = ({ name, onClick, anchorEl,handleClose, backgroundSx, ...props }) => {
    const open = Boolean(anchorEl);
    const {user, isLoggedIn} = React.useContext(SysAppContext);
    const navigate = useNavigate();

    const openPage = (url: string, exit:boolean = false) => async () => {
		handleClose();
		navigate(url);
        if(!exit) return;
        Meteor.logout();
        await cleanUserCache();
	};


	return (
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl as Element}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={open}
            sx={StyledSysMenu.menu}
            onClose={handleClose}>
            {!user || !user._id
                ? [
                        <MenuItem key={'signin'} onClick={openPage('/signin')}>
                            Entrar
                        </MenuItem>
                    ]
                : [
                        
                        <Typography key={'userName'} variant="subtitle1" sx={StyledSysMenu.header}
                        
                        >{user.username}</Typography>
                        ,
                        <MenuItem key={'signout'} onClick={openPage('/', true)}>
                            <ExitToAppIcon />
                            <Typography variant="body1" sx={StyledSysMenu.textColor}
                            >Sair</Typography>
                        </MenuItem>
                    ]}
        </Menu>
	);
};