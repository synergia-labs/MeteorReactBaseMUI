import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Modules from "../../modules";
import NotFound from "../pages/NotFound/NotFound";
import { getUser } from "/imports/libs/getUser";
import { segurancaApi } from "/imports/seguranca/api/SegurancaApi";
import { IRoute } from "/imports/modules/modulesTypings";
import { SignIn } from "../pages/SignIn/Signin";

const AppRouterSwitch = (switchProps: any) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Routes location={location}>
      {(Modules.getListOfRouterModules() || [])
        .filter((r) => !!r)
        .map((routerData: IRoute | null) => {
          if (routerData?.isProtected) {
            const RenderedComponent = routerData.component as React.ElementType;
            const resources = routerData.resources;

            const isLogged = switchProps?.isLoggedIn;
            let possuiPermissao = true;
            if (resources) {
              possuiPermissao = segurancaApi.podeAcessarRecurso(
                getUser(),
                ...resources
              );
            }
            return (
              <Route
                key={routerData?.path}
                exact={true}
                path={routerData?.path}
                element={
                  isLogged && possuiPermissao ? (
                    <RenderedComponent
                      navigate={navigate}
                      location={location}
                      {...switchProps}
                    />
                  ) : (
                    <SignIn
                      navigate={navigate}
                      location={location}
                      {...switchProps}
                    />
                  )
                }
              />
            );
          } else {
            const RenderedComponent = routerData?.component as React.ElementType;
            return (
              <Route
                key={routerData?.path}
                exact={true}
                path={routerData?.path}
                element={
                  <RenderedComponent
                    navigate={navigate}
                    location={location}
                    {...switchProps}
                  />
                }
              />
            );
          }
        })}
      <Route element={NotFound} />
    </Routes>
  );
};

export default AppRouterSwitch;
