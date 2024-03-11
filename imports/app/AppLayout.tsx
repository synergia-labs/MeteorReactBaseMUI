import React, {useCallback } from "react";
import { ISysAppLayoutContext, ISysGeneralComponentsCommon, ISysThemeOptions } from "/imports/typings/BoilerplateDefaultTypings";
import { BrowserRouter as Router } from 'react-router-dom';
import { IShowNotificationProps, ShowNotification } from "/imports/ui/appComponents/showNotification/showNotification";
import { AppRouterSwitch } from "./AppRouterSwitch";
import { IShowDialogProps, ShowDialog } from "/imports/ui/appComponents/SysDialog/SysDialog";
import { IShowDrawerProps, ShowDrawer } from "/imports/ui/appComponents/showDrawer/showDrawer";
import { ISysTemplate, SysTemplateOptions } from "/imports/ui/templates/getTemplate";
import SysRoutes from './routes';

const routes = new SysRoutes();
export const SysAppLayoutContext = React.createContext<ISysAppLayoutContext>({} as ISysAppLayoutContext);

const defaultState: ISysGeneralComponentsCommon = {
    open: false,
    close: () => {throw new Error('Função de fechar não implementada');},
    onOpen: () => {throw new Error('Função de abrir não implementada');},
    onClose: () => {throw new Error('Função de fechar não implementada');},
}

/* Opções default do template */
export const defaultTemplate: ISysTemplate = {
    variant: SysTemplateOptions.AppBar,    
    menuOptions: routes.getMenuItens(),
    props: undefined,
}

export const AppLayout:React.FC<ISysThemeOptions> = ({...themeOptions}) => {
    const [showNotification, setShowNotification] = React.useState<IShowNotificationProps>(defaultState);
    const [showDialog, setShowDialog]             = React.useState<IShowDialogProps>(defaultState);
    const [showDrawer, setShowDrawer]             = React.useState<IShowDrawerProps>(defaultState);
    const [showModal, setShowModal]               = React.useState<IShowDialogProps>(defaultState);
    const [showWindow, setShowWindow]             = React.useState<IShowDialogProps>(defaultState);

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

    //Show Modal
    const handleCloseModal = useCallback((
        event?: {}, 
        reason?: "backdropClick" | "escapeKeyDown", 
        callBack?: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void
    ) => {
        setShowModal(defaultState);
        callBack?.(event, reason);
    }, []);

    const showModalHandler = useCallback((props?: IShowDialogProps) => {
        props?.onOpen?.();
        handleCloseNotification();
        setShowModal({
            ...showDialog,
            ...props,
            close: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => handleCloseModal(event, reason, props?.onClose),
            open: true,
        });
    }, []);
    //Fim Show Modal

    //Show Window
    const handleCloseWindow = useCallback((
        event?: {}, 
        reason?: "backdropClick" | "escapeKeyDown", 
        callBack?: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void
    ) => {
        setShowWindow(defaultState);
        callBack?.(event, reason);
    }, []);

    const showWindowHandler = useCallback((props?: IShowDialogProps) => {
        props?.onOpen?.();
        handleCloseNotification();
        setShowWindow({
            ...showDialog,
            fullScreen: true,
            ...props,
            close: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => handleCloseWindow(event, reason, props?.onClose),
            open: true,
        });
    }, []);
    //Fim Show Window

    const providerValue = React.useMemo(() => ({
        ...themeOptions,
        showNotification:   showNotificationHandler,
        showDialog:         showDialogHandler,
        closeNotification:  handleCloseNotification,
        closeDialog:        handleCloseDialog,
        showDrawer:         showDrawerHandler,
        closeDrawer:        handleCloseDrawer,
        showModal:          showModalHandler,
        closeModal:         handleCloseModal,
        showWindow:         showWindowHandler,
        closeWindow:        handleCloseWindow,
    }), [themeOptions]);


    return (
        <SysAppLayoutContext.Provider value={providerValue}>
            <Router>
                <AppRouterSwitch defaultTemplate={defaultTemplate}/>
            </Router>
            <ShowNotification {...showNotification} />
            <ShowDrawer       {...showDrawer}       />
            <ShowDialog       {...showDialog}       />
            <ShowDialog       {...showModal}        />
            <ShowDialog       {...showWindow}       />
        </SysAppLayoutContext.Provider>
    )
};