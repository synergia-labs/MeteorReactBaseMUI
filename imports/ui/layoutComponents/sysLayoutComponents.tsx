import React, { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { sysSizing } from '../materialui/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';

export interface ITextOverflow extends Omit<TypographyProps, 'ref'> {
  maxLines?: string;
}

export const TextOverflow: ElementType<ITextOverflow> =
    styled(Typography, {
        shouldForwardProp: (prop) => prop !== 'maxLines'
    })<ITextOverflow>(({ maxLines }) => ({
        ...(!!maxLines && {
            display: '-webkit-box',
            WebkitLineClamp: parseInt(maxLines),
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
        })
    }));

export const SysSectionPaddingXY = styled(Box)(({theme}) => ({
  padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
  [theme.breakpoints.down('md')]: {
    padding: `${sysSizing.contentPt} 5vw ${sysSizing.contentPb}`
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${sysSizing.contentPt} ${sysSizing.spacingFixedMd} ${sysSizing.contentPb}`
  }
}));

export const SysSectionPaddingX = styled(Box) (({theme}) => ({
  paddingLeft: `10vw`,
  paddingRight: `10vw`,
  [theme.breakpoints.down('md')]: {
    paddingLeft: `5vw`,
    paddingRight: `5vw`,
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: `${sysSizing.spacingFixedMd}`,
    paddingRight: `${sysSizing.spacingFixedMd}`,
  }
}));

export const SysSectionPaddingY = styled(Box) (({}) => ({
  paddingTop: `${sysSizing.contentPt}`,
  paddingBottom: `${sysSizing.contentPb}`,
}));

