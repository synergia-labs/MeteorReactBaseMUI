import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import sysSizes from '/imports/ui/materialui/sysSizes';
import { sysSizing } from '../materialui/styles';



const SysSectionPaddingXY = styled(Box)(({theme}) => ({
  padding: `${sysSizes.contentPt} ${sysSizing.contentPx}`,
  [theme.breakpoints.down('md')]: {
    padding: `${sysSizes.contentPt} 5vw ${sysSizes.contentPb}`
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${sysSizes.contentPt} ${sysSizes.spacingFixedMd} ${sysSizes.contentPb}`
  }
}));

const SysSectionPaddingX = styled(Box) (({theme}) => ({
  paddingLeft: `10vw`,
  paddingRight: `10vw`,
  [theme.breakpoints.down('md')]: {
    paddingLeft: `5vw`,
    paddingRight: `5vw`,
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: `${sysSizes.spacingFixedMd}`,
    paddingRight: `${sysSizes.spacingFixedMd}`,
  }
}));

const SysSectionPaddingY = styled(Box) (({}) => ({
  paddingTop: `${sysSizes.contentPt}`,
  paddingBottom: `${sysSizes.contentPb}`,
}));

export {
  SysSectionPaddingXY, SysSectionPaddingX, SysSectionPaddingY
}
