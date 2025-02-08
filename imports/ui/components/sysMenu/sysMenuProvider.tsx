import React, { ElementType, forwardRef, ForwardRefRenderFunction, ReactElement, ReactNode, useCallback, useImperativeHandle, useState } from 'react';
import Context, { ISysMenuContext } from './sysMenuContext';
import SysMenuView from './sysMenuView';
import { MenuProps } from '@mui/material/Menu';

interface ISysMenuController extends Omit<MenuProps, 'open' | 'onClose' | 'anchorEl'>{
    /** Função de callback chamada quando o menu é fechado */
    onCloseCallback?: () => void;
    /**Quando ativo aparece uma indicação no menu de onde ele foi clicado  @default false*/
    activeArrow?: boolean;
    /**Lista de opções que serão convertidas em itens no menu */
    options?: Array<ISysMenuItem>;
    /**Componente default que será exibido quando não existir itens no menu */
    menuItemDedaultComponent?: ElementType;
    /**Elemento que contem a lista a ser renderizada do menu */
    contentContainer?: ElementType;
    /** Conteúdo do menu: Quando existe tem prioridade sobre os itens passados como opcoes*/
    children?: ReactNode;
}

interface ISysMenuRef {
    open: boolean;
    closeMenu: () => void;
    openMenu: (event: React.MouseEvent<HTMLElement>) => void; 
}

interface ISysMenuItem {
    key: string;
    onClick?: () => void;
    component?: ElementType;
    resources?: Array<string>;
    otherProps?: Record<string, any>;
}

const SysMenu: ForwardRefRenderFunction<ISysMenuRef, ISysMenuController> = ({
    onCloseCallback,
    options,
    activeArrow,
    menuItemDedaultComponent,
    contentContainer,
    ...menuProps
 }, ref) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleOpenMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    }, [setAnchorEl]);

    const handleCloseMenu = useCallback(() => {
        onCloseCallback?.();
        setAnchorEl(null);
    }, [setAnchorEl, onCloseCallback]);

    const refFunctions: () => ISysMenuRef = () => ({
        open: open,
        closeMenu: handleCloseMenu,
        openMenu: handleOpenMenu
    });

    useImperativeHandle(ref, refFunctions, [open]);

    const contextValues: ISysMenuContext = {
        anchorEl: anchorEl,
        open: open,
        closeMenu: handleCloseMenu,
        activeArrow: activeArrow || false,
        options: options,
        menuItemDedaultComponent: menuItemDedaultComponent,
        contentContainer: contentContainer
    };

    return (
        <Context.Provider value={contextValues}>
            <SysMenuView {...menuProps}/>
        </Context.Provider>
    )
};

export default forwardRef(SysMenu);
export type { ISysMenuRef, ISysMenuItem };