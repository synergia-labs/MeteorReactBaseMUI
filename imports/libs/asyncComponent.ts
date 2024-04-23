import Loadable from 'react-loadable';

const asyncComponent = (importingComponent, LoadingComponent = () => <Loading / >) =>
  Loadable({
    loader: typeof importingComponent === 'function' ? importingComponent : () => importingComponent,
    loading: LoadingComponent // Loading screen when asynchronously importing component
  });

export default asyncComponent;
