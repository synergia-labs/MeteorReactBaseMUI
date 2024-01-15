import React, {useCallback } from "react";
import { ISysAppLayoutContext, ISysGeneralComponentsCommon, ISysThemeOptions } from "/imports/typings/BoilerplateDefaultTypings";
import { BrowserRouter as Router } from 'react-router-dom';
import { IShowNotificationProps, ShowNotification } from "../GeneralComponents/showNotification/showNotification";
import { AppRouterSwitch } from "./AppRouterSwitch";
import { IShowDialogProps, ShowDialog } from "../GeneralComponents/showDialog/showDialog";
import { IShowDrawerProps, ShowDrawer } from "../GeneralComponents/showDrawer/showDrawer";
import { ISysTemplate, SysTemplateOptions } from "./templates/getTemplate";
import SysRoutes from './routes';

export const SysAppLayoutContext = React.createContext<ISysAppLayoutContext>({} as ISysAppLayoutContext);

const defaultState: ISysGeneralComponentsCommon = {
    open: false,
    close: () => {throw new Error('Função de fechar não implementada');},
    onOpen: () => {throw new Error('Função de abrir não implementada');},
    onClose: () => {throw new Error('Função de fechar não implementada');},
}

/* Opções default do template */
const defaultTemplate: ISysTemplate = {
    variant: SysTemplateOptions.AppBar,    
    menuOptions: SysRoutes.getMenuItens(),
    props: undefined,
}

export const AppLayout:React.FC<ISysThemeOptions> = ({...themeOptions}) => {
    const [showNotification, setShowNotification] = React.useState<IShowNotificationProps>(defaultState);
    const [showDialog, setShowDialog]             = React.useState<IShowDialogProps>(defaultState);
    const [showDrawer, setShowDrawer]             = React.useState<IShowDrawerProps>(defaultState);

    // Show Notification 
    const handleCloseNotification = useCallback((
        event?: React.SyntheticEvent | Event, 
        reason?: string, 
        callBack?: (event?: React.SyntheticEvent | Event, reason?: string,) => void
    ) => {
        if (reason === 'clickaway') return;
        setShowNotification(defaultState);
        callBack?.(event, reason);
    }, []);

    const showNotificationHandler = useCallback((props?: IShowNotificationProps) => {
        props?.onOpen?.();
        setShowNotification({
            ...showNotification,
            ...props,
            close: (event?: React.SyntheticEvent | Event, reason?: string) => handleCloseNotification(event, reason, props?.onClose),
            open: true,
        });
    }, []); 
    // Fim Show Notification

    //Show Dialog
    const handleCloseDialog = useCallback((
        event?: {}, 
        reason?: "backdropClick" | "escapeKeyDown", 
        callBack?: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void
    ) => {
        setShowDialog(defaultState);
        callBack?.(event, reason);
    }, []);

    const showDialogHandler = useCallback((props?: IShowDialogProps) => {
        props?.onOpen?.();
        handleCloseNotification();
        setShowDialog({
            ...showDialog,
            ...props,
            close: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => handleCloseDialog(event, reason, props?.onClose),
            open: true,
        });
    }, []);
    //Fim Show Dialog

    //Show Drawer
    const handleCloseDrawer = useCallback((
        event?: {}, reason?: "backdropClick" | "escapeKeyDown", 
        callBack?: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void) => {
        setShowDrawer(defaultState);
        callBack?.(event, reason);
    }, []);

    const showDrawerHandler = useCallback((props?: IShowDrawerProps) => {
        props?.onOpen?.();
        handleCloseNotification();
        setShowDrawer({
            ...showDrawer,
            ...props,
            close: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => handleCloseDrawer(event, reason, props?.onClose),
            open: true,
        });
    }, []);
    //Fim Show Drawer

    const providerValue = React.useMemo(() => ({
        ...themeOptions,
        showNotification:   showNotificationHandler,
        showDialog:         showDialogHandler,
        closeNotification:  handleCloseNotification,
        closeDialog:        handleCloseDialog,
        showDrawer:         showDrawerHandler,
        closeDrawer:        handleCloseDrawer,
    }), [themeOptions]);


    return (
        <SysAppLayoutContext.Provider value={providerValue}>
            <Router>
                <AppRouterSwitch defaultTemplate={defaultTemplate}/>
            </Router>
            <ShowNotification {...showNotification} />
            <ShowDialog {...showDialog} />
            <ShowDrawer {...showDrawer} />
        </SysAppLayoutContext.Provider>
    )
};