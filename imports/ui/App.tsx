import React from 'react';
import AppLayoutFixedMenu from './layouts/AppLayoutFixedMenu.tsx';
import GeneralComponents from './AppGeneralComponents';
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from "/imports/materialui/theme";
import {useAccount} from "/imports/libs/userAccount";
import { useTheme } from '@material-ui/core/styles';

const AppContainer = (props) => {
    const { isLoggedIn, user,loading } = useAccount();

    const theme = useTheme();
    return (
        <AppLayoutFixedMenu {...props} user={user} isLoggedIn={isLoggedIn} theme={theme} />
    )
}

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GeneralComponents
                render={(props)=><AppContainer {...props} />}
            />
        </ThemeProvider>

    );
}
