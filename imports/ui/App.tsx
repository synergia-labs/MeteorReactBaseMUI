import React from 'react';
import AppLayoutFixedMenu from './layouts/AppLayoutFixedMenu.tsx';
import GeneralComponents from './AppGeneralComponents';
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from "/imports/materialui/theme";
import {useAccount} from "/imports/libs/userAccount";

const AppContainer = (props) => {
    const { isLoggedIn, user,loading } = useAccount();

    return (
        <AppLayoutFixedMenu {...props} user={user} isLoggedIn={isLoggedIn} />
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
