import React from 'react';
import SysTabsStyles from './sysTabsStyles';
import {SxProps, Theme} from '@mui/system';


const {
  Container,
  Tab,
  Tabs,
} = SysTabsStyles;

/**
 * Interface para representar uma aba em um sistema de abas.
 */
interface IAba {
	/** O rótulo da aba. */
	label: string;
	/** O valor associado à aba. */
	value: string;
	/** Indica se a aba está desabilitada. */
	disabled?: boolean;
	/** Ícone da aba. */
	icon?: React.ReactNode;
	/** Posição do ícone da aba. */
	iconPosition?: 'start' | 'end' | 'bottom';
}

/**
 * Props para o componente SysTabs.
 */
interface ISysTabs {
	/** Lista de abas a serem exibidas. */
	abas: IAba[];
	/** O valor da aba selecionada. */
	value: string;
	/** Função de retorno de chamada chamada quando uma aba é alterada. */
	handleChange: (event: React.SyntheticEvent, newValue: string) => void;
	/** Cor do texto das abas. */
	textColor?: 'secondary' | 'inherit' | 'primary' | undefined;
	/** Cor do indicador de seleção. */
	indicatorColor?: 'secondary' | 'primary' | undefined;
	/** Variante do sistema de abas. */
	variant?: 'fullWidth' | 'scrollable' | 'standard' | undefined;
	/** Indica se as abas devem ser centralizadas. */
	centered?: boolean;
	/** Indica se devem ser exibidos botões de rolagem em dispositivos móveis. */
	allowScrollButtonsMobile?: boolean;
	/** Tipo de botões de rolagem. */
	scrollButtons?: 'auto' | false;
	/** Orientação das abas. */
	orientation?: 'vertical' | 'horizontal';
	/** Mapeamento de estilos personalizados para o componente e seus elementos filhos. */
	sxMap?: {
		/** Estilos personalizados para o contêiner de abas. */
		container?: SxProps<Theme>;
		/** Estilos personalizados para as abas. */
		tabs?: SxProps<Theme>;
		/** Estilos personalizados para uma aba individual. */
		tab?: SxProps<Theme>;
	};
}

/**
 * O componente SysTabs é um sistema de abas personalizado.
 * Permite a exibição de várias abas com comportamentos e estilos personalizados.
 */
export const SysTabs: React.FC<ISysTabs> = ({
	abas = [],
	value,
	handleChange,
	textColor = 'primary',
	indicatorColor = 'primary',
	variant = 'standard',
	centered = false,
	allowScrollButtonsMobile = false,
	scrollButtons = 'auto',
	orientation = 'horizontal',
	sxMap
}) => {
	return (
		<Container orientation={orientation} sx={sxMap?.container}>
			<Tabs
				scrollButtons={scrollButtons}
				centered={centered}
				value={value}
				onChange={handleChange}
				textColor={textColor}
				indicatorColor={indicatorColor}
				variant={variant}
				allowScrollButtonsMobile={allowScrollButtonsMobile}
				orientation={orientation}
				sx={sxMap?.tabs}>
				{abas.map((aba) => (
					<Tab
						label={aba.label}
						value={aba.value}
						key={aba.value}
						disabled={aba.disabled}
						sx={sxMap?.tab}
						icon={typeof aba.icon === 'string' ? aba.icon : ''}
						iconPosition={aba?.iconPosition}
					/>
				))}
			</Tabs>
		</Container>
	);
};
