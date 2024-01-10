import React from "react";
import { BoxProps, AvatarProps, Typography } from "@mui/material";
import { StyledSysAvatar, SysAvatarContainer } from "./sysAvatarStyles";


export interface SysAvatarProps extends AvatarProps {
    /**O nome que será usado para mostrar a primeira letra no avatar.*/
    name?: string;
    /**Estilos personalizados para o componente Box que envolve o Avatar.*/
    backgroundSx?: BoxProps['sx'];
    /**A cor da borda do avatar.*/
    borderColor?: string;
    /**Um manipulador de eventos onClick para o componente.*/
    onClick?: () => void;
}


/**
 * O componente `SysAvatar` é um componente React personalizado que exibe um avatar. 
 * Ele é construído usando componentes do Material-UI e estilos personalizados.
 * 
 * Notas:
 * - O componente `SysAvatar` é um componente React personalizado que exibe um avatar.
 * - O componente prioriza a exibição da imagem através da propriedade `src` e, caso não seja possível, exibe a primeira letra do nome através da propriedade `name`.
 */
export const SysAvatar: React.FC<SysAvatarProps> = ({
    name,
    backgroundSx,
    borderColor, 
    onClick,
    ...props
}) => {
    return (
        <SysAvatarContainer sx={backgroundSx} onClick={onClick} onClickS={!!onClick} borderColor={borderColor}>
            <StyledSysAvatar {...props}>
                <Typography variant="h3">{name?.[0].toUpperCase()}</Typography>
            </StyledSysAvatar>
        </SysAvatarContainer>
    );
}
