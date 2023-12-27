import React, { createContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppNavBar } from './AppNavBar';
import { AppRouterSwitch } from './AppRouterSwitch';
import { fixedMenuLayoutStyle } from './FixedMenuLayoutStyle';
import Box from '@mui/material/Box';
import { AppTopMenu } from './components/AppTopMenu';
import { useTheme } from '@mui/material';

interface FixedMenuLayoutContextType {
	showAppBar: boolean;
	handleOcultarAppBar: () => void;
	handleExibirAppBar: () => void;
}

export const FixedMenuLayoutContext = createContext({} as FixedMenuLayoutContextType);

export const FixedMenuLayout = () => {
	const theme  = useTheme();
	const [showAppBar, setShowAppBar] = useState<boolean>(true);
	const handleOcultarAppBar = () => setShowAppBar(false);
	const handleExibirAppBar = () => setShowAppBar(true);
	

	return (
		<Router>
			<FixedMenuLayoutContext.Provider value={{ showAppBar, handleOcultarAppBar, handleExibirAppBar }}>
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
	);
};


//Adicionar o contexto de lauyout e interface nesse provider. Linguagem, tema, etc...