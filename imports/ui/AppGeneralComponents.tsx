import React, { useState, useEffect } from 'react';
import { isMobile } from '/imports/libs/deviceVerify';
import './notificationStyle.css';
import { Button, Theme } from '@mui/material';
import { IBoilerplateShowMethods } from '../typings/BoilerplateDefaultTypings';
import { DialogContainer } from './GeneralComponents/DialogContainer';
import { WindowContainer } from './GeneralComponents/WindowContainer';
import { DrawerContainer } from './GeneralComponents/DrawerContainer';
import { ModalContainer } from './GeneralComponents/ModalContainer';
import { showNotification } from './GeneralComponents/ShowNotification';
import { Delete } from '@mui/icons-material';

if (isMobile) {
	// @ts-ignore
	import './notificationTipMobile.css';
} else {
	// @ts-ignore
	import './notificationTipWeb.css';
}

export interface IDialogProps {
	closeDialog: () => void;
}
export interface ICommonOptions extends IBoilerplateShowMethods {
	open: boolean;
	onClose: () => void;
	onOpen: () => void;
	closeComponent?: () => void;
	closeDialog?: () => void;
	theme?: Theme;
}

interface IAppGeneralComponentsState {
	dialogOptions: ICommonOptions | null;
	drawerOptions: ICommonOptions | null;
	windowOptions: ICommonOptions | null;
	modalOptions: ICommonOptions | null | boolean;
}

interface IGeneralComponentsProps {
	themeOptions: {
		isDarkThemeMode: boolean;
		setDarkThemeMode: (mode: boolean) => void;
		setFontScale: (p: number) => void;
		fontScale: number;
	};
	children: React.ReactFragment | React.ElementType | JSX.Element;
}

export const commonOptions = { open: false, onClose: () => {}, onOpen: () => {}, fullScreenOnMobile: false };

export const AppContext = React.createContext({});

export const AppGeneralComponents = (props: IGeneralComponentsProps) => {
	const defaultState = {
		dialogOptions: null,
		drawerOptions: null,
		windowOptions: null,
		modalOptions: null
	};

	const [state, setState] = useState<IAppGeneralComponentsState>(defaultState);

	useEffect(() => {
		if (window.history) {
			window.history.pushState(null, null, window.location.href);
			window.onpopstate = function () {
				window.history.go(1);
			};
		}
	}, []);

	const showDialog = (options = {}) => {
		setState({
			...state,
			dialogOptions: {
				open: true,
				onClose: () => setState({ ...state, dialogOptions: null }),
				onOpen: () => {},
				closeDialog: () => setState({ ...state, dialogOptions: null }),
				...options
			}
		});
	};

	const showDeleteDialog = (title: string, message: string, doc: Object, remove: (doc: Object) => void) => {
		const options = {
			icon: <Delete />,
			title,
			content: () => {
				return <p>{message}</p>;
			},
			actions: ({ closeDialog }: { closeDialog: () => void }) => [
				<Button key={'botaoNao'} variant={'outlined'} color={'secondary'} onClick={closeDialog}>
					Não
				</Button>,
				<Button
					key={'botaoSim'}
					variant={'contained'}
					onClick={() => {
						remove(doc);
						closeDialog();
					}}
					color={'primary'}>
					Sim
				</Button>
			]
		};
		setState({
			...state,
			dialogOptions: {
				open: true,
				onClose: () => setState({ ...state, dialogOptions: null }),
				onOpen: () => {},
				closeDialog: () => setState({ ...state, dialogOptions: null }),
				...options
			}
		});
	};

	const showModal = (options = {}) => {
		setState({
			...state,
			modalOptions: {
				open: true,
				onOpen: () => setState({ ...state, modalOptions: true }),
				onClose: () => setState({ ...state, modalOptions: false }),
				closeComponent: () => setState({ ...state, modalOptions: false }),
				...{ ...props, render: undefined },
				showNotification: showNotification,
				showDialog: showDialog,
				showDrawer: showDrawer,
				showWindow: showWindow,
				...options
			}
		});
	};

	const showDrawer = (options = {}) => {
		setState({
			...state,
			drawerOptions: {
				open: true,
				onClose: () => setState({ ...state, drawerOptions: null }),
				onOpen: () => {},
				closeComponent: () => setState({ ...state, drawerOptions: null }),
				...{ ...props, render: undefined },
				showNotification: showNotification,
				showDialog: showDialog,
				showDrawer: showDrawer,
				showWindow: showWindow,
				...options
			}
		});
	};

	const showWindow = (options = {}) => {
		setState({
			...state,
			windowOptions: {
				open: true,
				onClose: () => setState({ ...state, windowOptions: null }),
				onOpen: () => {},
				closeComponent: () => setState({ ...state, windowOptions: null }),
				...{ ...props, render: undefined },
				showNotification: showNotification,
				showDialog: showDialog,
				showDrawer: showDrawer,
				showWindow: showWindow,
				...options
			}
		});
	};

	return (
		<AppContext.Provider
			value={{
				showNotification: showNotification,
				showDialog: showDialog,
				showDeleteDialog: showDeleteDialog,
				showDrawer: showDrawer,
				showWindow: showWindow,
				showModal: showModal,
				themeOptions: props.themeOptions
			}}>
			<>
				{state.dialogOptions ? <DialogContainer {...state.dialogOptions} /> : null}
				{state.drawerOptions ? <DrawerContainer {...state.drawerOptions} /> : null}
				{state.windowOptions ? <WindowContainer {...state.windowOptions} /> : null}
				{state.modalOptions ? <ModalContainer {...(state.modalOptions as ICommonOptions)} /> : null}
				{props.children}
			</>
		</AppContext.Provider>
	);
};
