import React from 'react';
import Styles from './sysAvatarStyles';
import {AvatarProps} from '@mui/material/Avatar';
import Typography, { TypographyProps } from '@mui/material/Typography';
import {SxProps, Theme} from '@mui/material/styles';
import { hasValue } from '/imports/libs/hasValue';

interface ISysAvatar extends Omit<AvatarProps, 'onClick'> {
  /**O nome que será usado para mostrar a primeira letra no avatar.*/
  name?: string;
  /**Tamanhos default para o componente @default medium*/
  size?: 'small' | 'medium' | 'large';
  /** Borda circular de distância de 4 px do avatar. @default false */
  activateOutline?: boolean;
  /** Estilos personalizados para o componente Box que envolve o Avatar. */
  sxAvatar?: SxProps<Theme>;
  /** Variante do texto que exibe a letra do nome no avatar. */
  textVariant?: TypographyProps['variant'];
  /** Função chamada quando há um click no componente */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * O componente `SysAvatar` é um componente React personalizado que exibe um avatar.
 * Ele é construído usando componentes do Material-UI e estilos personalizados.
 *
 * Notas:
 * - O componente `SysAvatar` é um componente React personalizado que exibe um avatar.
 * - O componente prioriza a exibição da imagem através da propriedade `src` e, caso não seja possível, exibe a primeira letra do nome através da propriedade `name`.
 */
const SysAvatar: React.FC<ISysAvatar> = ({
  name,
  onClick,
  activateOutline = false,
  size = 'medium',
  sx,
  sxAvatar,
  textVariant = 'h5',
  ...otherProps
}) => {
  return (
    <Styles.container 
      size={size} 
      onClick={onClick}
      activateOutline={activateOutline}
      cursorPointer={hasValue(onClick)}
      sx={sx}
    >
      <Styles.avatar {...otherProps} sx={sxAvatar}>
        <Typography variant={textVariant}>{name?.[0].toUpperCase()}</Typography>
      </Styles.avatar>
    </Styles.container>
  );
};


export default SysAvatar;