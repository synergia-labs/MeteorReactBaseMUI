import React from 'react';
import ExampleContainer from '../ui/pages/exampleContainer';
import { Recurso } from './Recursos';

export const exampleRouterList = [
  {
    path: '/example/:screenState/:exampleId',
    component: ExampleContainer,
    isProtected: true,
		resources: [Recurso.EXEMPLO_VIEW]
  },
  {
    path: '/example/:screenState',
    component: ExampleContainer,
    isProtected: true,
		resources: [Recurso.EXEMPLO_VIEW]
  },
  {
    path: '/example',
    component: ExampleContainer,
    isProtected: true,
		resources: [Recurso.EXEMPLO_VIEW]
  },
];
