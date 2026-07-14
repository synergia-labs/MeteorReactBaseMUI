import React, { ComponentType, lazy, Suspense } from 'react';
import { SysLoading } from '/imports/ui/components/sysLoading/sysLoading';

type ImportedComponent<TProps> = Promise<{ default: ComponentType<TProps> }>;
type ComponentImporter<TProps> = (() => ImportedComponent<TProps>) | ImportedComponent<TProps>;

class AsyncErrorBoundary extends React.Component<React.PropsWithChildren, { failed: boolean }> {
	state = { failed: false };

	static getDerivedStateFromError() {
		return { failed: true };
	}

	render() {
		if (this.state.failed) {
			return React.createElement('div', { role: 'alert' }, 'Não foi possível carregar esta tela. Atualize a página.');
		}
		return this.props.children;
	}
}

const asyncComponent = <TProps extends object = Record<string, never>>(
	importingComponent: ComponentImporter<TProps>,
	LoadingComponent: ComponentType = () => React.createElement(SysLoading)
) => {
	const LazyComponent = lazy(typeof importingComponent === 'function' ? importingComponent : () => importingComponent);

	function AsyncComponent(props: TProps) {
		return React.createElement(
			AsyncErrorBoundary,
			null,
			React.createElement(
				Suspense,
				{ fallback: React.createElement(LoadingComponent) },
				React.createElement(LazyComponent, props)
			)
		);
	}

	AsyncComponent.displayName = `Async(${LazyComponent.name || 'Component'})`;

	return AsyncComponent;
};

export default asyncComponent;
