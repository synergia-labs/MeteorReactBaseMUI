import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import AppNavBar from "./appNavBar";
import AppRouterSwitch from "./appRouterSwitch";

import { appLayoutMenuStyle } from "./AppLayoutFixedMenuStyle";
import { useTheme } from "@mui/material/styles";

const FixedMenuLayout = (props) => {
  const theme = useTheme();

  return (
    <Router>
      <div
        style={{
          ...appLayoutMenuStyle.containerAppRouter,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <AppNavBar {...props} />
        <div style={appLayoutMenuStyle.routerSwitch}>
          <AppRouterSwitch {...props} />
        </div>
      </div>
    </Router>
  );
};

export default FixedMenuLayout;
