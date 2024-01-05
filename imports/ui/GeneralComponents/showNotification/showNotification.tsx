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


export interface IShowNotification extends Omit<IShowNotificationProps, 'open'> {}

/**
 * Componente ShowNotification
 *
 * Este componente é utilizado para exibir notificações interativas na forma de uma Snackbar. É altamente configurável, permitindo a especificação de diversos comportamentos e estilos.
 * 
 * Principais funcionalidades:
 *   - Exibe mensagens de notificação com suporte a diferentes tipos (sucesso, erro, informação, aviso e customizavel).
 *   - Permite a definição de uma transição personalizada para a aparição da notificação, proporcionando uma experiência visual aprimorada.
 *   - Oferece controle sobre a duração da exibição da notificação e sua posição na tela.
 *   - Suporta a inclusão de um título, mensagem personalizada, ícone e ações adicionais, permitindo uma customização detalhada.
 *   - O estilo do componente pode ser personalizado através de propriedades sx, seguindo os padrões do Material-UI.
 * 
 * Este componente é ideal para exibir feedbacks em tempo real para os usuários, como confirmações de ações, alertas de erro ou avisos importantes. Sua implementação facilita a integração com o contexto global de layout da aplicação, permitindo que as notificações sejam gerenciadas de forma centralizada. Basta importar a função shoNotification do provider AppLayoutContext e chamá-la sempre que necessário.
 *

 *
 * O componente faz parte do ecossistema do Material-UI e é integrado com outros componentes e utilitários para criar uma interface de usuário consistente e acessível.
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
                direction: transitionDirection ?? vertical === 'top' ? 'down' : 'up',
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
