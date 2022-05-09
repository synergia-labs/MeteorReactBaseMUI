import React from 'react';
import AppLayoutFixedMenu from './layouts/appLayoutFixedMenu.tsx';
import GeneralComponents from './AppGeneralComponents';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from '/imports/materialui/theme';
import {useAccount} from '/imports/libs/userAccount';
import {useTheme} from '@mui/styles';

interface IAppContainer{
  showDialog?: () => void;
  showDrawer?: () => void;
  showWindow?: () => void;  
  showModal?: () => void;  
  showNotification?: () => void;  
}

const AppContainer = (props: IAppContainer) => {
  const {isLoggedIn, user, userLoading} = useAccount();

  const theme = useTheme();
  return (
      <AppLayoutFixedMenu {...props} user={user} isLoggedIn={isLoggedIn}
                          userLoading={userLoading} theme={theme}/>
  );
};

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GeneralComponents render={(props) => <AppContainer {...props} />}/>
    </ThemeProvider>
  );
};
