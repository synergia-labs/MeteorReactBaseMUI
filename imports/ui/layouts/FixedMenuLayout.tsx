import React, { createContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppNavBar } from './AppNavBar';
import { AppRouterSwitch } from './AppRouterSwitch';

import { fixedMenuLayoutStyle } from './FixedMenuLayoutStyle';
import { ILayoutProps } from '/imports/typings/BoilerplateDefaultTypings';
import Box from '@mui/material/Box';
import { AppTopMenu } from './components/AppTopMenu';

interface FixedMenuLayoutContextType {
	handleOcultarAppBar: () => void;
	handleExibirAppBar: () => void;
}

export const FixedMenuLayoutContext = createContext({} as FixedMenuLayoutContextType);

export const FixedMenuLayout = (props: ILayoutProps) => {
	const { isMobile, theme } = props;

	const [showAppBar, setShowAppBar] = useState<boolean>(true);

	const handleOcultarAppBar = () => {
		setShowAppBar(false);
	};

	const handleExibirAppBar = () => {
		setShowAppBar(true);
	};

	return (
		<Router>
			<FixedMenuLayoutContext.Provider value={{ handleOcultarAppBar, handleExibirAppBar }}>
				<Box
					sx={{
						...fixedMenuLayoutStyle.containerAppRouter,
						backgroundColor: theme.palette.background.default
					}}>
					<AppTopMenu {...props} />

					{showAppBar && !isMobile && <AppNavBar {...props} />}
					<Box sx={fixedMenuLayoutStyle.routerSwitch}>
						<AppRouterSwitch {...props} />
					</Box>
					{showAppBar && isMobile && <AppNavBar {...props} />}
				</Box>
			</FixedMenuLayoutContext.Provider>
		</Router>
	);
};
