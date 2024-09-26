import React, { ReactNode, useEffect } from 'react';
import { ISysGeneralComponentsCommon } from '../../../typings/BoilerplateDefaultTypings';
import { SxProps, Theme } from '@mui/material';
import Drawer, { DrawerProps } from '@mui/material/Drawer';

export interface IShowDrawerProps extends ISysGeneralComponentsCommon, Omit<DrawerProps, 'open' | 'onClose'> {
	/** Define o lado do ancoramento do Drawer. */
	anchor?: 'left' | 'right' | 'top' | 'bottom';
	/** Estilização customizada do Drawer seguindo padrões Material-UI. */
	sx?: SxProps<Theme>;
	/** Estilos personalizados aplicados especificamente ao fundo do Drawer. */
	sxBackground?: SxProps<Theme>;
	/** Conteúdo personalizado a ser exibido dentro do Drawer. */
	children?: ReactNode;
}

/**
 * Visão Geral:
 * - O `ShowDrawer` é um componente React para criar Drawers customizáveis, proporcionando uma interface lateral deslizante.
 *
 * Funcionalidades:
 * - Personalização: Permite customizar a posição, o conteúdo e o estilo do Drawer.
 *
 * Casos de Uso:
 * - Menus Laterais: Ideal para navegação em aplicativos ou websites, oferecendo uma interface acessível e organizada.
 * - Filtros em Aplicações: Pode ser usado para apresentar opções de filtragem em aplicações, otimizando a experiência do usuário.
 *
 * Dicas de Implementação:
 * - Responsividade: Adapta-se bem a diferentes tamanhos de tela, oferecendo uma experiência consistente em dispositivos móveis e desktops.
 * - Integração com Material-UI: Facilmente estilizável com as propriedades de sx do Material-UI, permitindo uma ampla customização.
 *
 * Disponibilidade Global:
 * - Pode ser integrado em qualquer parte da aplicação que utilize o Material-UI, oferecendo uma solução consistente e reutilizável para interfaces laterais.
 * - O `ShowDialog` é acessível globalmente através da função `showDrawer` fornecida pelo `SysAppLayoutContext`.
 *  */
export const ShowDrawer: React.FC<IShowDrawerProps> = ({
	open = false,
	close,
	anchor = 'left',
	sx,
	sxBackground,
	children,
	duration,
	...drawerProps
}: IShowDrawerProps) => {
	useEffect(() => {
		if (!!!duration) return;
		let timer: number | undefined;
		if (open && duration) timer = window.setTimeout(() => close?.({}, 'backdropClick'), duration);
		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [open]);

	return (
		<Drawer
			{...drawerProps}
			open={open}
			onClose={close}
			anchor={anchor}
			sx={sxBackground}
			PaperProps={drawerProps.PaperProps ?? { sx: sx }}>
			{children}
		</Drawer>
	);
};
