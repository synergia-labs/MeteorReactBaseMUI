import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import AppLayoutContext, { IAppLayoutContext, ICloseDialog, ICloseNotification, ISysThemeOptions } from './appLayoutContext';
import { IShowNotificationProps, ShowNotification } from '/imports/ui/appComponents/showNotification/showNotification';
import { ISysGeneralComponentsCommon } from '/imports/typings/BoilerplateDefaultTypings';
import { IShowDrawerProps, ShowDrawer } from '/imports/ui/appComponents/showDrawer/showDrawer';
import { IShowDialogProps, ShowDialog } from '/imports/ui/appComponents/showDialog/showDialog';
import GlobalStyles from "@mui/material/GlobalStyles";
import useMediaQuery from '@mui/material/useMediaQuery';
import ThemeProvider  from '@mui/material/styles/ThemeProvider';
import { getTheme } from '/imports/ui/materialui/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ISysTemplate, SysTemplateOptions } from '/imports/ui/templates/getTemplate';
import sysRoutes from '../routes/routes';

const defaultState: ISysGeneralComponentsCommon = { open: false };

const AppLayoutProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const userAgent = window.navigator.userAgent.toLowerCase();
	const isMobile = /iphone|ipod|android|ie|blackberry|fennec/.test(userAgent);
	const isTablet = /ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/.test(userAgent);
	const deviceType: 'mobile' | 'tablet' | 'desktop' = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
    
    const [showNotification, setShowNotification] = useState<IShowNotificationProps>(defaultState);
    const [showDrawer, setShowDrawer] = useState<IShowDrawerProps>(defaultState);
    const [showDialog, setShowDialog] = useState<IShowDialogProps>(defaultState);
    const [showModal, setShowModal] = useState<IShowDialogProps>(defaultState);
    const [showWindow, setShowWindow] = useState<IShowDialogProps>(defaultState);
    const [darkThemeMode, setDarkThemeMode] = useState<boolean>(prefersDarkMode);
	const [fontScale, setFontScale] = useState<number>(1);

	const changeFontScale = useCallback( (fontScale: number) => setFontScale(fontScale), [setFontScale] );
	const changeThemeMode = useCallback((value: boolean) => setDarkThemeMode(value), [setDarkThemeMode]);

	const getGlobalStyles = useCallback(() => {
		if(isMobile || isTablet) return null;
		return (
			<GlobalStyles styles={{
				scrollbarColor: '#ccc #00000012',
				scrollbarWidth: 'thin',
				'::-webkit-scrollbar': { width: '10px', height: '8px', margin: '16px'},
				'::-webkit-scrollbar-track': { background: '#00000012', margin: '16px', borderRadius: '20px'},
				'::-webkit-scrollbar-thumb': { background: '#ccc', borderRadius: '20px'},
				'::-webkit-scrollbar-thumb:hover': { background: '#bbb'}
			}}/>
		 );
	}, [isMobile, isTablet]);

    //region Show Notification
    const handleCloseNotification = useCallback(({ event, reason, callBack }: ICloseNotification = {}) => {
        if (reason === 'clickaway') return;
        setShowNotification(defaultState);
        callBack?.(event, reason);
    },[]);

    const handleShowNotification = useCallback(({ onOpen, onClose, ...props }: IShowNotificationProps) => {
        handleCloseNotification();
        onOpen?.();
        setShowNotification({
            ...showNotification,
            ...props,
            close: ({event, reason} : ICloseNotification) => handleCloseNotification({event, reason, callBack: onClose}),
            open: true
        });
    }, []);
    //endregion

    //region Show Drawer
    const handleCloseDrawer = useCallback(({ event, reason, callBack }: ICloseDialog = {}) => {
        setShowDrawer(defaultState);
        callBack?.(event, reason);
    },[]);
    
    const handleShowDrawer = useCallback(({ onOpen, onClose, ...props }: IShowDrawerProps) => {
        onOpen?.();
        setShowDrawer({
            ...showDrawer,
            ...props,
            close: ({event, reason}: ICloseDialog) => handleCloseDrawer({event, reason, callBack: onClose}),
            open: true
        });
    }, []);
    //endregion

    //region Show Dialog
    const handleCloseDialog = useCallback(({ event, reason, callBack }: ICloseDialog = {}) => {
        setShowDialog(defaultState);
        callBack?.(event, reason);
    },[]);

    const handleShowDialog = useCallback(({ onOpen, onClose, ...props }: IShowDialogProps) => {
        onOpen?.();
        handleCloseNotification();
        setShowDialog({
            ...showDialog,
            ...props,
            close: ({event, reason}: ICloseDialog) => handleCloseDrawer({event, reason, callBack: onClose}),
            open: true
        });
    }, []);
    //endregion

    //region Show Modal
    const handleCloseModal = useCallback(({ event, reason, callBack }: ICloseDialog = {}) => {
        setShowModal(defaultState);
        callBack?.(event, reason);
    },[]);

    const handleShowModal = useCallback(({ onOpen, onClose, ...props }: IShowDialogProps) => {
        onOpen?.();
        handleCloseNotification();
        setShowModal({
            ...showDialog,
            ...props,
            close: ({event, reason}: ICloseDialog) => handleCloseDrawer({event, reason, callBack: onClose}),
            open: true
        });
    }, []);
    //endregion

    //region Show Window
    const handleCloseWindow = useCallback(({ event, reason, callBack }: ICloseDialog = {}) => {
        setShowWindow(defaultState);
        callBack?.(event, reason);
    },[]);

    const handleShowWindow = useCallback(({ onOpen, onClose, ...props }: IShowDialogProps) => {
        onOpen?.();
        handleCloseNotification();
        setShowWindow({
            ...showDialog,
            ...props,
            close: ({event, reason}: ICloseDialog) => handleCloseDrawer({event, reason, callBack: onClose}),
            fullScreen: true,
            open: true
        });
    }, []);
    //endregion

    const themeOptions: ISysThemeOptions = useMemo(
        () => ({
            darkMode: darkThemeMode,
            fontScale,
            deviceType,
            setDarkThemeMode: changeThemeMode,
            setFontScale: changeFontScale
    }),[darkThemeMode, fontScale, deviceType]);

    const defaultTemplate: ISysTemplate = {
        variant: SysTemplateOptions.AppBar,
        menuOptions: sysRoutes.getMenuItens(),
        props: undefined
    } as const;

    const contextValues: IAppLayoutContext = useMemo(() => ({
        ...themeOptions,
        defaultTemplate: defaultTemplate,
        showNotification: handleShowNotification,
        closeNotification: handleCloseNotification,
        showDrawer: handleShowDrawer,
        closeDrawer: handleCloseDrawer,
        showDialog: handleShowDialog,
        closeDialog: handleCloseDialog,
        showModal: handleShowModal,
        closeModal: handleCloseModal,
        showWindow: handleShowWindow,
        closeWindow: handleCloseWindow
    }), [themeOptions]);

    return (
        <ThemeProvider theme={getTheme(themeOptions)}>
            <CssBaseline enableColorScheme />
            { getGlobalStyles() }
            <AppLayoutContext.Provider value={contextValues}>
                {children}
                <ShowNotification {...showNotification} />
                <ShowDrawer {...showDrawer} />
                <ShowDialog {...showDialog} />
                <ShowDialog {...showModal} />
                <ShowDialog {...showWindow} />
            </AppLayoutContext.Provider>
        </ThemeProvider>
    );
};

export default AppLayoutProvider;