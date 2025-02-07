import React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Theme, SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { ISysGeneralComponentsCommon } from '../../../typings/BoilerplateDefaultTypings';
import { hasValue } from '../../../libs/hasValue';
import Styles from './showNotificationStyles';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';

export interface IShowNotificationProps extends ISysGeneralComponentsCommon {
	/**Exibe um botão para fechar a notificação.*/
	showCloseButton?: boolean;
	/**Exibe um ícone no início do corpo notificação.*/
	showStartIcon?: boolean;
	/**Especifica o tipo da notificação, como sucesso, erro, informação ou aviso.*/
	type?: 'success' | 'error' | 'warning' | 'default';
	/** Define o título da notificação, destacado na parte superior.*/
	title?: string;
	/**Estabelece a mensagem principal da notificação.*/
	message?: string;
	/**Posicionamento horizontal da notificação na tela.*/
	horizontal?: 'left' | 'center' | 'right';
	/**Posicionamento vertical da notificação na tela.*/
	vertical?: 'top' | 'bottom';
	/**Permite a inclusão de um ícone personalizado na notificação.*/
	icon?: React.ReactNode;
	/**Exibe um botão de ação na notificação, com um texto personalizado.*/
	actionButtonTex?: string;
	/**Define a ação a ser executada ao clicar no botão de ação.*/
	onClickActionButton?: () => void;
	/** Adiciona uma ação personalizada, como um botão ou link, na notificação.*/
	action?: React.ReactNode;
	/** Aplica estilos personalizados ao componente seguindo o padrão do Material-UI.*/
	sxMap?: {
		container?: SxProps<Theme>;
		header?: SxProps<Theme>;
		body?: SxProps<Theme>;
	};
	/**
	 * A propriedade 'children' permite a inserção de um elemento JSX personalizado na snackBar.
	 * Utilize esta propriedade para customizar o conteúdo da snackBar, adicionando elementos específicos
	 * de acordo com as necessidades do seu projeto. Essa flexibilidade é ideal para situações onde
	 * uma configuração padrão da snackBar não é suficiente, possibilitando a criação de uma interface
	 * mais rica e interativa. A customização pode incluir a adição de ícones, layouts personalizados,
	 * estilizações específicas ou qualquer outro elemento JSX que enriqueça a experiência do usuário.
	 */
	children?: JSX.Element;
}

/**
 * Visão Geral:
 * - O `ShowNotification` é um componente React para exibir notificações interativas na forma de uma Snackbar, integrado ao ecossistema Material-UI.
 * - Oferece ampla personalização, incluindo tipos de notificações, animações, posicionamento e conteúdo customizado.
 *
 * Principais Funcionalidades:
 *   - Suporta diferentes tipos de notificações: sucesso, erro, informação, aviso e personalizável.
 *   - Permite a escolha de animações de transição (slide, grow, fade, zoom) para uma experiência visual enriquecida.
 *   - Controla a duração e posicionamento da notificação na tela, e permite um botão para fechar a notificação.
 *   - Suporta título, mensagem, ícone, ações adicionais, e personalização de estilos através das propriedades `sx`.
 *
 * Casos de Uso:
 * - Ideal para feedbacks em tempo real, como confirmações de ações, alertas de erro ou avisos importantes.
 * - Fácil integração com o contexto global de layout da aplicação para gerenciamento centralizado de notificações.
 *
 * Dicas de Implementação:
 * - Pode ser configurado para auto-fechamento após um período definido.
 * - Adapta-se a diferentes tamanhos de tela com opções de posicionamento variáveis.
 * - Permite personalização completa do visual através das propriedades `sx` do Material-UI.
 * - Aceita `children` para customização total do conteúdo, permitindo maior flexibilidade no design.
 *
 * Disponibilidade Global:
 * - O `ShowNotification` é acessível globalmente através da função `ShowNotification` fornecida pelo `SysAppLayoutContext`.
 *
 */

export const ShowNotification: React.FC<IShowNotificationProps> = ({
	open = false,
	close,
	duration = 4000,
	horizontal = 'left',
	vertical = 'bottom',
	type = 'default',
	showCloseButton = false,
	showStartIcon = true,
	title,
	message,
	icon,
	sxMap,
	actionButtonTex,
	onClickActionButton,
	action,
	children
}) => {
	const icons = {
		success: <SysIcon name={'check'} />,
		error: <SysIcon name={'errorCircle'} />,
		warning: <SysIcon name={'warningAmber'} />,
		default: <SysIcon name={'notification'} />
	};

	return (
		<Snackbar
			open={open}
			onClose={close}
			autoHideDuration={duration}
			anchorOrigin={{
				vertical: vertical,
				horizontal: horizontal
			}}>
			{hasValue(children) ? (
				children
			) : (
				<Styles.Container type={type} sx={sxMap?.container}>
					<Styles.Header sx={sxMap?.header}>
						<Typography variant="subtitle1">{title}</Typography>
					</Styles.Header>
					<Styles.Body sx={sxMap?.body}>
						{showStartIcon && (hasValue(icon) ? icon : icons[type])}
						<Typography variant="body1" color="textPrimary" sx={{ flexGrow: 1 }}>
							{message}
						</Typography>
						{hasValue(action)
							? action
							: (hasValue(onClickActionButton) || hasValue(actionButtonTex)) && (
									<Button
										variant="text"
										size="small"
										color={type === 'default' ? 'primary' : type}
										onClick={onClickActionButton}
										sx={{
											color: (theme) =>
												type === 'default'
													? theme.palette.sysAction?.primary
													: type === 'warning'
														? theme.palette.warning.dark
														: theme.palette[type].main
										}}>
										{actionButtonTex || 'Ação'}
									</Button>
								)}
						{showCloseButton && (
							<IconButton onClick={close}>
								<SysIcon name={'close'} />
							</IconButton>
						)}
					</Styles.Body>
				</Styles.Container>
			)}
		</Snackbar>
	);
};
