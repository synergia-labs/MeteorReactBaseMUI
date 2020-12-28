import React from 'react';
import AppLayoutFixedMenu from './layouts/AppLayoutFixedMenu.tsx';
import GeneralComponents from './AppGeneralComponents';
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from "/imports/materialui/theme";
import {useAccount} from "/imports/libs/userAccount";



export const App = () => {
    const { isLoggedIn, user,loading } = useAccount();
    console.log('Loading',loading)
    return (
        <ThemeProvider theme={theme}>
            <GeneralComponents
                user={user} isLoggedIn={isLoggedIn}
                render={(props)=><AppLayoutFixedMenu {...props} user={user} isLoggedIn={isLoggedIn} />}
            />
        </ThemeProvider>

    );
}
