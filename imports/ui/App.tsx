import React from 'react';
import AppLayoutFixedMenu from './layouts/AppLayoutFixedMenu.tsx';
import GeneralComponents from './AppGeneralComponents';
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from "/imports/materialui/theme";


export const App = () => (
    <ThemeProvider theme={theme}>
        <GeneralComponents
            render={(props)=><AppLayoutFixedMenu {...props} />}
        />
    </ThemeProvider>

    );
