import React, { createContext, ElementType } from 'react';
import { ISysMenuItem } from './sysMenuProvider';

interface ISysMenuContext {
    anchorEl: null | HTMLElement;
    open: boolean;
    closeMenu: () => void;
    activeArrow: boolean;
    options?: Array<ISysMenuItem>;
    menuItemDedaultComponent?: ElementType;
    contentContainer?: ElementType;
}

const sysMenuContext = createContext<ISysMenuContext>({} as ISysMenuContext);
export default sysMenuContext;
export type { ISysMenuContext };