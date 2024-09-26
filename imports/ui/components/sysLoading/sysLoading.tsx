import React from 'react';
import Typography from '@mui/material/Typography';
import LoadingStyle from './sysLoadingStyle';
import { SxProps, Theme } from '@mui/material';


const { Container, Loading } = LoadingStyle;

/**
 * Props para o componente SysLoading.
 */
interface ISysLoading {
	/** O rótulo a ser exibido embaixo do indicador de carregamento. */
	label?: string;
	/** O tamanho do indicador de carregamento. */
	size?: 'small' | 'medium' | 'large';
	/** Mapeamento de estilos personalizados para o componente e seus elementos filhos. */
	sxMap?: {
		/** Estilos personalizados para o container principal. */
		container?: SxProps<Theme>;
		/** Estilos personalizados para o indicador de carregamento. */
		loading?: SxProps<Theme>;
	};
}

/**
 * O componente `SysLoading` é um componente React personalizado que exibe um indicador de carregamento.
 *
 * Notas:
 * - O componente pode exibir um rótulo opcional ao lado do indicador de carregamento.
 * - O tamanho do indicador de carregamento pode ser ajustado através da propriedade `size`.
 * - Estilos personalizados podem ser fornecidos através da propriedade `sxMap`.
 */
export const SysLoading: React.FC<ISysLoading> = ({ label, size = 'medium', sxMap }) => {
	return (
		<Container sx={sxMap?.container}>
			<Loading sx={sxMap?.loading} size={size} />
			{label && (
				<Typography variant={size === 'small' ? 'caption' : 'body1'} color={(theme) => theme.palette.sysText?.primary}>
					{label}
				</Typography>
			)}
		</Container>
	);
};
