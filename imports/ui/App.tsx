import React from 'react';
import AppLayoutFixedMenu from './layouts/AppLayoutFixedMenu.tsx';
import GeneralComponents from './AppGeneralComponents';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "/imports/materialui/theme";
import {useAccount} from "/imports/libs/userAccount";
import { useTheme } from '@mui/styles';

const AppContainer = (props) => {
    const { isLoggedIn, user,userLoading } = useAccount();

    const theme = useTheme();
    return (
        <AppLayoutFixedMenu {...props} user={user} isLoggedIn={isLoggedIn} userLoading={userLoading} theme={theme} />
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
