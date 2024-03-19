import React from 'react';
import Typography from '@mui/material/Typography';
import PainelExpansivoStyle from './sysPainelExpansivelStyles';
import { MouseEventHandler } from 'react';
import { SxProps, Theme } from '@mui/system';

/**
 * Props para o componente SysPainelExpansivo.
 */
export interface ISysPainelExpansivo {
	/** O título do painel. */
	titulo: string;
	/** O conteúdo do painel. */
	conteudo: string;
	/** O ícone de expansão do painel. */
	expandIcon?: React.ReactNode;
	/** Indica se o painel está aberto ou fechado. */
	aberta?: boolean;
	/** Lista de ações disponíveis para o painel. */
	actions?: IAction[];
	/** Indica se o painel está desabilitado. */
	disabled?: boolean;
	/** A posição do ícone no painel. */
	posicaoIcone?: 'inicio' | 'fim';
	/** Mapeamento de estilos personalizados para o componente e seus elementos filhos. */
	sxMap?: {
		/** Estilos personalizados para o acordion. */
		acordion?: SxProps<Theme>;
		/** Estilos personalizados para o acordionSumamry. */
		acordionSumamry?: SxProps<Theme>;
		/** Estilos personalizados para o acordionDetail. */
		acordionDetail?: SxProps<Theme>;
		/** Estilos personalizados para o acordionActions. */
		acordionActions?: SxProps<Theme>;
	};
}

/**
 * Interface para uma ação disponível no painel.
 */
export interface IAction {
	/** O título da ação. */
	tituloAcao: string;
	/** O manipulador de evento da ação. */
	acao: MouseEventHandler<HTMLButtonElement>;
	/** Estilos personalizados para a ação. */
	sxAction?: {
		/** Estilos personalizados para o botão da ação. */
		button?: SxProps<Theme>;
		/** Estilos personalizados para o texto do botão da ação. */
		textButton?: SxProps<Theme>;
	};
}

/**
 * O componente `SysPainelExpansivo` é um componente React personalizado que exibe um painel expansivo.
 *
 * Notas:
 * - O componente exibe um título, conteúdo e ícone de expansão.
 * - A lista de ações pode ser adicionada ao painel.
 * - Estilos personalizados podem ser fornecidos através da propriedade `sxMap`.
 */
export const SysPainelExpansivo: React.FC<ISysPainelExpansivo> = ({
	titulo,
	conteudo,
	expandIcon,
	aberta = false,
	actions = [],
	disabled = false,
	posicaoIcone = 'fim',
	sxMap
}) => {
	return (
		<PainelExpansivoStyle.container>
			<PainelExpansivoStyle.acordion
				sx={sxMap?.acordion}
				defaultExpanded={aberta}
				disabled={disabled}
				slotProps={{ transition: { unmountOnExit: true } }}>
				<PainelExpansivoStyle.acordionSumamry
					expandIcon={expandIcon}
					posicaoIcone={posicaoIcone}
					sx={sxMap?.acordionSumamry}>
					<Typography variant="h6">{titulo}</Typography>
				</PainelExpansivoStyle.acordionSumamry>

				<PainelExpansivoStyle.acordionDetail sx={sxMap?.acordionDetail}>
					<Typography variant="body1">{conteudo}</Typography>
				</PainelExpansivoStyle.acordionDetail>

				<PainelExpansivoStyle.acordionActions sx={sxMap?.acordionActions}>
					{actions.length > 0 &&
						actions.map((acao, index) => (
							<PainelExpansivoStyle.actionButton onClick={acao.acao} key={index} sx={acao.sxAction?.button}>
								<Typography sx={acao.sxAction?.textButton}>{acao.tituloAcao}</Typography>
							</PainelExpansivoStyle.actionButton>
						))}
				</PainelExpansivoStyle.acordionActions>
			</PainelExpansivoStyle.acordion>
		</PainelExpansivoStyle.container>
	);
};
