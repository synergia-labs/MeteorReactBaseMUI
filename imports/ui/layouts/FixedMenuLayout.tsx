import React, { createContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppNavBar } from './AppNavBar';
import { AppRouterSwitch } from './AppRouterSwitch';
import { fixedMenuLayoutStyle } from './FixedMenuLayoutStyle';
import Box from '@mui/material/Box';
import { AppTopMenu } from './components/AppTopMenu';
import { useTheme } from '@mui/material';
import {ShowNotification, IShowNotificationProps} from '../GeneralComponents/showNotification/showNotification';

interface FixedMenuLayoutContextType {
	showAppBar: boolean;
	handleOcultarAppBar: () => void;
	handleExibirAppBar: () => void;
	showNotification: (props: IShowNotification) => void;
}

export const FixedMenuLayoutContext = createContext({} as FixedMenuLayoutContextType);

export const FixedMenuLayout = () => {
	const theme  = useTheme();
	const [showAppBar, setShowAppBar] = useState<boolean>(true);
	const handleOcultarAppBar = () => setShowAppBar(false);
	const handleExibirAppBar = () => setShowAppBar(true);

	const [showNotification, setShowNotification] = useState<IShowNotificationProps>({});
	const showNotificationHandler = React.useCallback((props: IShowNotification) => {
		setShowNotification({
			...props,
			open: true,
			onClose: () => {
				props.onClose?.();
				setShowNotification({ ...props, open: false });
			}
		});
	}, []);

	const contextValue: FixedMenuLayoutContextType = React.useMemo(() => ({
		showAppBar,
		handleOcultarAppBar,
		handleExibirAppBar,
		showNotification: showNotificationHandler
	}), []);

	return (
		<>
			<Router>
				<FixedMenuLayoutContext.Provider value={contextValue}>
					<Box
						sx={{
							...fixedMenuLayoutStyle.containerAppRouter,
							backgroundColor: theme.palette.background.default
						}}>
						<AppTopMenu />

						{showAppBar && <AppNavBar />}
						<Box sx={fixedMenuLayoutStyle.routerSwitch}>
							<AppRouterSwitch />
						</Box>
					</Box>
				</FixedMenuLayoutContext.Provider>
			</Router>
			<ShowNotification {...showNotification} />
		</>
	);
};


//Adicionar o contexto de lauyout e interface nesse provider. Linguagem, tema, etc...