import React from 'react';
import ExampleContainer from '../ui/exampleContainer';
import { Recurso } from './Recursos';
import { IRoute } from '/imports/modules/modulesTypings';

export const exampleRouterList: (IRoute | null)[] = [
    {
        path: '/example/:screenState/:exampleId',
        component: ExampleContainer,
        isProtected: true,
        resources: [Recurso.EXAMPLE_VIEW],
    },
    {
        path: '/example/:screenState',
        component: ExampleContainer,
        isProtected: true,
        resources: [Recurso.EXAMPLE_CREATE],
    },
    {
        path: '/example',
        component: ExampleContainer,
        isProtected: true,
        resources: [Recurso.EXAMPLE_VIEW],
    },
];
