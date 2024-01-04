import React, { ReactNode, FC, useEffect } from "react";
import { ISysGeneralComponentsCommon } from "/imports/typings/BoilerplateDefaultTypings";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, SxProps, Theme, useMediaQuery, useTheme } from "@mui/material";
import { DialogTitleStyled } from "./showDialoStyles";
import { DialogTransitions } from "../transitions";

export interface IShowDialogProps extends ISysGeneralComponentsCommon, Omit<DialogProps, 'open'> {
    open?: boolean;
    close?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
    onOpen?: () => void;
    onClose?: () => void;
    /** Título do diálogo.*/
    title?: string;
    /** Ícone exibido antes do título do diálogo. */
    prefixIcon?: ReactNode;
    /** Ícone exibido após o título do diálogo. */
    sufixIcon?: ReactNode;
    /** Mensagem principal do diálogo. */
    message?: string;
    /** Elemento JSX ou array de elementos JSX para o cabeçalho personalizado do diálogo. */
    header?: JSX.Element | JSX.Element[];
    /** Conteúdo principal do diálogo como elemento JSX ou array de elementos JSX. */
    body?: JSX.Element | JSX.Element[];
    /** Elementos JSX representando as ações do diálogo. */
    actions?: JSX.Element | JSX.Element[];
    /** Duração em milissegundos para o diálogo ser automaticamente fechado.*/
    duration?: number;
    /** Propriedades de estilo personalizadas seguindo o padrão do Material-UI.*/
    sx?: SxProps<Theme>;
    /** Estilos personalizados para o fundo do diálogo.*/
    backgroundSx?: SxProps<Theme>;
    /** Se verdadeiro, o diálogo é exibido em tela cheia. */
    fullScreen?: boolean;
    /** Define o breakpoint de mídia para exibição em tela cheia do diálogo. */
    fullScreenMediaQuery?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** Define a transição de animação do diálogo. */
    transition?: 'slide' | 'grow' | 'zoom' | 'fade';
    /**
     * Esta propriedade permite a inserção de conteúdo personalizado no diálogo. Ao usar 'children', 
     * você pode reformular completamente a estrutura e o layout do diálogo, indo além das opções de 
     * personalização padrão. Isso é especialmente útil quando o design ou a funcionalidade requeridos 
     * não são cobertos pelas propriedades pré-definidas do componente. Utilize 'children' para adicionar 
     * elementos customizados a um Dialog em branco, possibilitando uma personalização integral do seu conteúdo.
     */
    children?: JSX.Element | JSX.Element[];
}


/**
 * Este componente é utilizado para exibir diálogos modais interativos com várias opções de personalização.
 * Permite a customização de título, mensagem, ícones, conteúdo, ações, duração, estilos, e comportamento de tela cheia.
 * Também suporta especificação de transições de animação e permite inclusão de conteúdo JSX adicional.
 * Ideal para exibir informações, confirmações ou formulários em uma interface modal.
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
    ...dialogProps
}: IShowDialogProps) => {

    useEffect(() => {
        if (!!!duration) return;
        let timer: number | undefined;
        if (open && duration)
            timer = window.setTimeout(() => close?.({}, 'backdropClick'), duration);
        return () => { if (timer) clearTimeout(timer); };
    }, [open, duration, close]);
    
    const theme = useTheme();
    const isFullScreen = useMediaQuery(theme.breakpoints.down(fullScreenMediaQuery ?? 'xs'));

    return (
        <Dialog
            {...dialogProps}
            open={open ?? false}
            onClose={close}
            TransitionComponent={DialogTransitions(transition ?? 'zoom')}
            PaperProps={dialogProps.PaperProps ?? {
                sx: sx,
            }}
            sx={backgroundSx}
            fullScreen={fullScreen || (!!fullScreenMediaQuery && isFullScreen)}
        >
            {children || (
                <>
                    {header || (
                        <DialogTitleStyled>
                            {prefixIcon}{title}
                            <Box flexGrow={1} />
                            {sufixIcon}
                        </DialogTitleStyled>
                    )}
                    {!!body || !!message && (
                        <DialogContent>
                            {body || (
                                <DialogContentText>
                                    {message}
                                </DialogContentText>
                            )}
                        </DialogContent>
                    )}
                    {!!actions && (
                        <DialogActions>
                            {actions}
                        </DialogActions>
                    )}
                </>
            )}
        </Dialog>
    );
};

