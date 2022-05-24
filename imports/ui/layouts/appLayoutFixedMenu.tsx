import React from 'react';

import {BrowserRouter as Router} from 'react-router-dom';
import AppNavBar from './appNavBar';
import AppRouterSwitch from './appRouterSwitch';

import {appLayoutMenuStyle} from './AppLayoutFixedMenuStyle';

const FixedMenuLayout = (props) => (
    <Router>
      <div style={appLayoutMenuStyle.containerAppRouter}>
            <AppNavBar {...props} />
        <div style={appLayoutMenuStyle.routerSwitch}>
          <AppRouterSwitch {...props} />
        </div>
      </div>
    </Router>
);

export default FixedMenuLayout;
