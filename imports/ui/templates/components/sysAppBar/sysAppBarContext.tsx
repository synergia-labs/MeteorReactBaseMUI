import React, { createContext, RefObject } from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import { ISysMenuItem, ISysMenuRef } from '/imports/ui/components/sysMenu/sysMenuProvider';

interface ISysAppBarContext {
    userName: string;
    menuOptions: Array<(IAppMenu | null)>;
    menuPerfilRef: RefObject<ISysMenuRef>;
    menuMobileRef: RefObject<ISysMenuRef>;
    onClickLogo: () => void;
    abrirMenuPerfil: (event: React.MouseEvent<HTMLElement>) => void;
    abrirMenuMobile: (event: React.MouseEvent<HTMLElement>) => void;
    getOpcoesMenuDeUsuario: () => Array<ISysMenuItem>;
    getOpcoesMenuMobile: () => Array<ISysMenuItem>;    
}

const SysAppBarContext = createContext<ISysAppBarContext>({} as ISysAppBarContext);
export default SysAppBarContext;
export type { ISysAppBarContext };