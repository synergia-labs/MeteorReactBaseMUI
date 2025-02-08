import React, { ReactNode, useCallback, useContext, useRef } from 'react';
import Context, { ISysAppBarContext } from './sysAppBarContext';
import { useNavigate } from 'react-router-dom';
import SysAppBarView from './sysAppBarView';
import AuthContext from '/imports/app/authProvider/authContext';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import { ISysMenuItem, ISysMenuRef } from '/imports/ui/components/sysMenu/sysMenuProvider';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import sysRoutes from '/imports/app/routes/routes';
import { hasValue } from '/imports/libs/hasValue';
import { IAppMenu } from '/imports/modules/modulesTypings';
import SysAvatar from '/imports/ui/components/sysAvatar/sysAvatar';

interface ISysAppBarController {
    logo?: ReactNode;
    menuOptions?: Array<(IAppMenu | null)>;
}

const SysAppBar: React.FC<ISysAppBarController> = ({
    logo,
    menuOptions = []
}) => {
    const { user, isLoggedIn, logout } = useContext(AuthContext);
    const { showModal } = useContext(AppLayoutContext);

    const navigate = useNavigate();
    const menuPerfilRef = useRef<ISysMenuRef>(null);
    const menuMobileRef = useRef<ISysMenuRef>(null);

    const onClickLogo = useCallback((): void => navigate('/'), [navigate]);
    
    const onLogout = useCallback(async (): Promise<void> => { 
        logout(() => navigate('/'));
    }, [navigate]);
    
    const abrirMenuPerfil = useCallback((event: React.MouseEvent<HTMLElement>): void => { 
        menuPerfilRef.current?.openMenu(event)
    }, [menuPerfilRef]);
    
    const abrirMenuMobile = useCallback((event: React.MouseEvent<HTMLElement>): void => {
        menuMobileRef.current?.openMenu(event)
    }, [menuMobileRef]);

    const getOpcoesMenuDeUsuario = useCallback((): Array<ISysMenuItem> => ([
        {
            key: 'perfil',
            // onClick: () => showUserProfileDetailControllerModal(showModal, {}),
            otherProps: {  label: user?.username || '-',  startIcon: (<SysAvatar name={user?.username}/>)},
        },
        {
            key: 'sair',
            onClick: onLogout,
            otherProps: { label: 'Sair', startIcon: (<SysIcon name='logout'/>)}
        }
    ]), [user, showModal, onLogout]);

    const getOpcoesMenuMobile = useCallback((): Array<ISysMenuItem> => menuOptions.map((option) => {
        const verificaUsuarioLogadoERotaProtegida = !isLoggedIn && sysRoutes.checkIfRouteIsProtected(option?.path || '');
        if(!hasValue(option) || verificaUsuarioLogadoERotaProtegida) return null;
        return {
            key: 'menu-' + option?.name,
            onClick: () => navigate(option?.path || ''),
            resources: option?.resources,
            otherProps: {
                label: option?.name || '',
                startIcon: option?.icon,
            }
        };
    }).filter((option) => option !== null), [menuOptions, navigate, isLoggedIn]);

    const providerValue: ISysAppBarContext = {
        userName: user?.username || '-',
        menuOptions,
        menuPerfilRef,
        menuMobileRef,
        onClickLogo,
        abrirMenuPerfil,
        abrirMenuMobile,
        getOpcoesMenuDeUsuario,
        getOpcoesMenuMobile
    };

    return (
        <Context.Provider value={providerValue}>
            <SysAppBarView logo={logo} />
        </Context.Provider>
    )
};

export default SysAppBar;