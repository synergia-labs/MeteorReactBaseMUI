import React from 'react';
import Loadable from 'react-loadable';
import { Loading } from '/imports/ui/components/Loading/Loading';

const asyncComponent = (importingComponent, LoadingComponent = () => <Loading />) =>
    Loadable({
        loader:
            typeof importingComponent === 'function'
                ? importingComponent
                : () => importingComponent,
        loading: LoadingComponent, // Loading screen when asynchronously importing component
    });

export default asyncComponent;
