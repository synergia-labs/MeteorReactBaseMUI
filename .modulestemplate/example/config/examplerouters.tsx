import React from 'react';
import ExampleContainer from '../ui/pages/exampleContainer';

export const exampleRouterList = [
  {
    path: '/example/:screenState/:exampleId',
    component: ExampleContainer,
    isProtected: true,
  },
  {
    path: '/example/:screenState',
    component: ExampleContainer,
    isProtected: true,
  },
  {
    path: '/example',
    component: ExampleContainer,
    isProtected: true,
  },
];
