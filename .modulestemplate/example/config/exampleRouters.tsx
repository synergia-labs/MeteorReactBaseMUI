import React from "react";
import ExampleContainer from "../ui/pages/exampleContainer";
import { Recurso } from "./Recursos";
import { IRoute } from "/imports/modules/modulesTypings";

export const exampleRouterList: IRoute[] = [
  {
    path: "/example/:screenState/:exampleId",
    component: ExampleContainer,
    isProtected: true,
    resources: [Recurso.EXEMPLO_VIEW],
  },
  {
    path: "/example/:screenState",
    component: ExampleContainer,
    isProtected: true,
    resources: [Recurso.EXEMPLO_CREATE],
  },
  {
    path: "/example",
    component: ExampleContainer,
    isProtected: true,
    resources: [Recurso.EXEMPLO_VIEW],
  },
];
