import React, { createContext, RefObject } from "react";
import { ISysMenuItem, ISysMenuRef } from "/imports/ui/components/sysMenu/sysMenuProvider";

interface ISysAppBarContext {
	userName: string;
	userPhoto?: string;
	menuPerfilRef: RefObject<ISysMenuRef>;
	menuMobileRef: RefObject<ISysMenuRef>;
	currentPath: string;
	onClickLogo: () => void;
	abrirMenuPerfil: (event: React.MouseEvent<HTMLElement>) => void;
	abrirMenuMobile: (event: React.MouseEvent<HTMLElement>) => void;
	getOpcoesMenuDeUsuario: () => Array<ISysMenuItem>;
	getOpcoesMenuMobile: () => Array<ISysMenuItem>;
}

const SysAppBarContext = createContext<ISysAppBarContext>({} as ISysAppBarContext);
export default SysAppBarContext;
export type { ISysAppBarContext };
