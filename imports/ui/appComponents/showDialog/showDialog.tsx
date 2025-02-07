import React, { FC, ReactNode, useEffect } from 'react';
import { ISysGeneralComponentsCommon } from '/imports/typings/BoilerplateDefaultTypings';
import Box from '@mui/material/Box';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { Theme, SxProps } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DialogContentStyled, DialogTitleStyled } from './showDialogStyles';
import { DialogTransitions } from '../transitions';
import { MemoryRouter } from 'react-router-dom';
import { AppRouterSwitch } from '/imports/app/routes/appRouterSwitch';

export interface IShowDialogProps extends ISysGeneralComponentsCommon, Omit<DialogProps, 'open'> {
	open?: boolean;
	close?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
	onOpen?: () => void;
	onClose?: () => void;
	/** Título exibido no topo do diálogo, fornece contexto sobre o seu conteúdo. */
	title?: string;
	/** Ícone opcional posicionado antes do título. */
	prefixIcon?: ReactNode;
	/** Ícone opcional posicionado após o título, podendo ser utilizado para ações adicionais. */
	sufixIcon?: ReactNode;
	/** Mensagem ou descrição exibida no corpo do diálogo, fornecendo informações detalhadas ao usuário. */
	message?: string;
	/** Personalização do cabeçalho do diálogo com um único elemento JSX ou um conjunto de elementos. */
	header?: ReactNode;
	/** Conteúdo principal do diálogo, permitindo a inserção de elementos JSX complexos ou simples. */
	body?: ReactNode;
	/** Elementos JSX para ações do diálogo, como botões de confirmação ou cancelamento. */
	actions?: ReactNode;
	/** Estilização customizada do diálogo seguindo padrões Material-UI, para temas e layout. */
	sx?: SxProps<Theme>;
	/** Estilos personalizados aplicados especificamente ao fundo do diálogo. */
	backgroundSx?: SxProps<Theme>;
	/** Se `true`, exibe o diálogo em tela cheia, ideal para dispositivos móveis ou conteúdos detalhados. */
	fullScreen?: boolean;
	/** Ponto de quebra para alteração do diálogo para tela cheia, ajustável conforme tamanho da tela. */
	fullScreenMediaQuery?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	/** Tipo de transição de animação para a abertura/fechamento do diálogo, adicionando dinamismo visual. */
	transition?: 'slide' | 'grow' | 'zoom' | 'fade';
	/** É possível definir um caminho de URL para o diálogo, permitindo a navegação para uma página específica*/
	urlPath?: string;
	/**
	 * Permite a inserção de conteúdo personalizado no diálogo, possibilitando uma reestruturação total para
	 * atender necessidades específicas de design e funcionalidade, indo além das propriedades padrão.
	 */
	children?: ReactNode;
}

/**
 * Visão Geral:
 * - O `ShowDialog` é um componente React para criar diálogos modais interativos com ampla personalização.
 *
 * Funcionalidades:
 * - Customização: Permite personalizar título, mensagem, ícones, conteúdo, ações, estilos, e comportamento de tela cheia.
 * - Transições Animadas: Suporta diferentes tipos de transições de animação para a exibição do diálogo.
 * - Conteúdo JSX Adicional: Possibilita a inclusão de conteúdo JSX adicional, permitindo maior flexibilidade no design.
 *
 * Casos de Uso:
 * - Informações e Confirmações: Ideal para apresentar informações, alertas, ou solicitar confirmações do usuário.
 * - Formulários: Pode ser usado para exibir formulários dentro de um contexto modal.
 *
 * Uso em Cascata:
 * - Diálogos Sequenciais: Permite que um diálogo abra outro, criando uma sequência de diálogos.
 * - Limitações: Em uma cascata de diálogos, não é possível usar a função do provider para controlar múltiplos diálogos simultaneamente.
 * - Solução: Para gerenciar múltiplos diálogos, é necessário instanciar novos componentes `ShowDialog` ou criar funções adicionais no provider.
 *
 * Dicas de Implementação:
 * - Duração: Pode ser configurado para fechar automaticamente após um período definido.
 * - Responsividade: Inclui opções para exibição em tela cheia e adaptação a diferentes tamanhos de tela.
 * - Personalização de Estilos: Integra-se com Material-UI para estilos personalizados, incluindo o fundo do diálogo.
 * - Conteúdo Flexível: Além das propriedades padrão, aceita `children` para uma personalização completa do conteúdo.
 *
 * Disponibilidade Global:
 * - O `ShowDialog` é acessível globalmente através da função `showDialog` fornecida pelo `SysAppLayoutContext`.
 * - Esta abordagem facilita a utilização do diálogo em diferentes partes da aplicação sem a necessidade de propagação manual do componente.
 * - O `showDialog` permite a exibição de diálogos modais de forma dinâmica e flexível em qualquer componente que tenha acesso ao contexto do projeto.
 */
export const ShowDialog: FC<IShowDialogProps> = ({
	open,
	close,
	title,
	message,
	header,
	prefixIcon,
	sufixIcon,
	body,
	actions,
	duration,
	sx,
	backgroundSx,
	fullScreen,
	fullScreenMediaQuery,
	transition,
	children,
	urlPath,
	...dialogProps
}: IShowDialogProps) => {
	useEffect(() => {
		if (!!!duration) return;
		let timer: number | undefined;
		if (open && duration) timer = window.setTimeout(() => close?.({}, 'backdropClick'), duration);
		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [open]);

	const theme = useTheme();
	const isFullScreen = useMediaQuery(theme.breakpoints.down(fullScreenMediaQuery ?? 'xs'));

	return (
		<Dialog
			{...dialogProps}
			open={open ?? false}
			onClose={close}
			TransitionComponent={DialogTransitions(transition ?? 'zoom')}
			PaperProps={
				dialogProps.PaperProps ?? {
					sx: sx
				}
			}
			sx={backgroundSx}
			fullScreen={fullScreen || (!!fullScreenMediaQuery && isFullScreen)}>
			{urlPath ? (
				<DialogContentStyled>
					<MemoryRouter initialEntries={[urlPath]} initialIndex={0}>
						<AppRouterSwitch />
					</MemoryRouter>
				</DialogContentStyled>
			) : (
				children || (
					<>
						{header || (
							<DialogTitleStyled>
								{prefixIcon}
								{title}
								<Box flexGrow={1} />
								{sufixIcon}
							</DialogTitleStyled>
						)}
						{(!!body || !!message) && (
							<DialogContentStyled>
								{body ? body : <DialogContentText>{message}</DialogContentText>}
							</DialogContentStyled>
						)}
						{!!actions && <DialogActions>{actions}</DialogActions>}
					</>
				)
			)}
		</Dialog>
	);
};
