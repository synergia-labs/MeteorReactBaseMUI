import React, {useCallback, useEffect} from "react";
import { ISysAppLayoutContext, ISysGeneralComponentsCommon, ISysThemeOptions } from "/imports/typings/BoilerplateDefaultTypings";
import { BrowserRouter as Router } from 'react-router-dom';
import { IShowNotificationProps, ShowNotification } from "../GeneralComponents/showNotification/showNotification";
import { Box } from "@mui/material";
import { AppRouterSwitch } from "./AppRouterSwitch";
import { fixedMenuLayoutStyle } from './FixedMenuLayoutStyle';
import { IShowDialogProps, ShowDialog } from "../GeneralComponents/showDialog/showDialog";
import { AppTopMenu } from "./components/AppTopMenu";

export const SysAppLayoutContext = React.createContext<ISysAppLayoutContext>({} as ISysAppLayoutContext);

const defaultState: ISysGeneralComponentsCommon = {
    open: false,
    close: () => {throw new Error('Função de fechar não implementada');},
    onOpen: () => {throw new Error('Função de abrir não implementada');},
    onClose: () => {throw new Error('Função de fechar não implementada');},
}

export const AppLayout:React.FC<ISysThemeOptions> = ({...themeOptions}) => {
    const [showNotification, setShowNotification] = React.useState<IShowNotificationProps>(defaultState);
    const [showDialog, setShowDialog] = React.useState<IShowDialogProps>(defaultState);

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

    const providerValue = React.useMemo(() => ({
        ...themeOptions,
        showNotification:   showNotificationHandler,
        showDialog:         showDialogHandler,
        closeNotification:  handleCloseNotification,
        closeDialog:        handleCloseDialog,
    }), [themeOptions]);


    return (
        <>
            <Router>
                <SysAppLayoutContext.Provider value={providerValue}>
                    <Box sx={fixedMenuLayoutStyle.routerSwitch}>
                        <AppRouterSwitch />
                    </Box>
                </SysAppLayoutContext.Provider>
            </Router>
            <ShowNotification {...showNotification} />
            <ShowDialog {...showDialog} />
        </>
    )
};