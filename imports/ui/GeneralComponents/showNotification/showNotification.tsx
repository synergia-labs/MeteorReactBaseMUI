import React from "react";
import { Button, IconButton, Snackbar, SxProps, Theme, Typography } from "@mui/material";
import {ShowNotificationTransitions} from "../transitions";
import { ISysGeneralComponentsCommon } from "/imports/typings/BoilerplateDefaultTypings";
import { hasValue } from "/imports/libs/hasValue";
import ShowNotificationStyles from "./showNotificationStyles";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export interface IShowNotificationProps extends ISysGeneralComponentsCommon{
    onOpen?: () => void;
    close?: () => void;
    onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
    duration?: number;
    /**Exibe um botão para fechar a notificação.*/
    showCloseButton?: boolean;
    /**Exibe um ícone no início do corpo notificação.*/
    showStartIcon?: boolean;
    /**Especifica o tipo da notificação, como sucesso, erro, informação ou aviso.*/
    type?: 'success' | 'error' | 'warning' | 'default';
    /**Seleciona a animação de transição para a exibição da notificação.*/
    transition?: 'slide' | 'grow' | 'fade' | 'zoom';
    /**Define a direção da animação de transição.*/
    transitionDirection?: 'up' | 'down' | 'left' | 'right';
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
    }
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
    transition = 'slide',
    type = 'default',
    transitionDirection,
    showCloseButton = false,
    showStartIcon = true,
    title,
    message,
    icon,
    sxMap,
    actionButtonTex,
    onClickActionButton,
    action,
    children,
}) => {

    const icons = {
        success: <CheckRoundedIcon />,
        error: <ErrorOutlineRoundedIcon />,
        warning: <WarningAmberRoundedIcon />,
        default: <NotificationsNoneRoundedIcon />,
    }

    return (
        <Snackbar
            open={open}
            onClose={close}
            autoHideDuration={duration}
            TransitionComponent={ShowNotificationTransitions({
                type: transition,
                direction: !!transitionDirection ? transitionDirection : vertical === 'top' ? 'down' : 'up',
            })}
            anchorOrigin={{
                vertical: vertical,
                horizontal: horizontal,
            }}
        > 
            {hasValue(children) ? (
                children
            ) : (
                <ShowNotificationStyles.container type={type} sx={sxMap?.container}>
                    <ShowNotificationStyles.header sx={sxMap?.header}>
                        <Typography variant="subtitle1">
                            {title}
                        </Typography>
                    </ShowNotificationStyles.header> 
                    <ShowNotificationStyles.body sx={sxMap?.body}>
                        {showStartIcon && (
                            hasValue(icon) ? icon : icons[type]
                        )}
                        <Typography variant="body1" color= "textPrimary" sx={{flexGrow: 1}}>
                            {message}
                        </Typography>
                        {hasValue(action) ? (
                            action
                        ):(
                            (hasValue(onClickActionButton) || hasValue(actionButtonTex)) &&
                                <Button 
                                    variant="text" 
                                    size='small'
                                    color={type === 'default' ? 'primary' : type}
                                    onClick={onClickActionButton}
                                    sx={{
                                        color: theme => 
                                            type === 'default' 
                                            ? theme.palette.sysAction?.primary 
                                            : type === 'warning' 
                                            ? theme.palette.warning.dark
                                            : theme.palette[type].main,
                                    }}
                                >
                                    {actionButtonTex || 'Ação'}
                                </Button>
                            
                        )}
                        {showCloseButton && (
                            <IconButton onClick={close}>
                                <CloseRoundedIcon />
                            </IconButton>
                        )}
                    </ShowNotificationStyles.body> 
                </ShowNotificationStyles.container> 
            )}
        </Snackbar>
    );
};
