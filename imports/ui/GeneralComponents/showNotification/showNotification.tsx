import React, {useEffect} from "react";
import { AlertTitle, Snackbar, SxProps, Theme } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {ShowNotificationTransitions} from "../transitions";
import { ISysGeneralComponentsCommon } from "/imports/typings/BoilerplateDefaultTypings";

export interface IShowNotificationProps extends ISysGeneralComponentsCommon{
    onOpen?: () => void;
    close?: () => void;
    onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
    duration?: number;
    /**Exibe um botão para fechar a notificação.*/
    showCloseButton?: boolean;
    /**Especifica o tipo da notificação, como sucesso, erro, informação ou aviso.*/
    type?: 'success' | 'error' | 'info' | 'warning';
    /**Seleciona a animação de transição para a exibição da notificação.*/
    transition?: 'slide' | 'grow' | 'fade' | 'zoom';
    /**Define a direção da animação de transição.*/
    transitionDirection?: 'up' | 'down' | 'left' | 'right';
    /** Define o título da notificação, destacado na parte superior.*/
    title?: string;
    /**Estabelece a mensagem principal da notificação.*/
    message?: string;
    /**Define o estilo da notificação.*/
    variant?: 'standard' | 'filled' | 'outlined';
    /**Posicionamento horizontal da notificação na tela.*/
    horizontal?: 'left' | 'center' | 'right';
    /**Posicionamento vertical da notificação na tela.*/
    vertical?: 'top' | 'bottom';
    /**Permite a inclusão de um ícone personalizado na notificação.*/
    icon?: React.ReactNode;
    /** Adiciona uma ação personalizada, como um botão ou link, na notificação.*/
    action?: React.ReactNode;
    /** Aplica estilos personalizados ao componente seguindo o padrão do Material-UI.*/
    sx?: SxProps<Theme>;
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
    showCloseButton = false,
    type,
    transition = 'slide',
    transitionDirection,
    title,
    message,
    duration = 3000,
    variant = 'filled',
    horizontal = 'left',
    vertical = 'bottom',
    icon,
    action,
    sx,
    children,
}) => {

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
      ) {
        return <MuiAlert elevation={6} ref={ref} variant={variant} {...props} />;
    });

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
            action={action}
        >
            {!!children ? children : (<Alert
                onClose={showCloseButton ? close : undefined}
                severity={type}
                action={action}
                icon={icon}
                sx={sx}
            >
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>)}
        </Snackbar>
    );
};
