import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import sysSizes from '/imports/ui/materialui/sysSizes';



const SysSectionPaddingXY = styled(Box)(({theme}) => ({
  padding: `${sysSizes.contentPt} 10vw ${sysSizes.contentPb}`,
  [theme.breakpoints.down('md')]: {
    padding: `${sysSizes.contentPt} 5vw ${sysSizes.contentPb}`
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${sysSizes.contentPt} ${sysSizes.spacingFixedSm} ${sysSizes.contentPb}`
  }
}));

const SysSectionPaddingX = styled(Box) (({theme}) => ({
  paddingLeft: `${sysSizes.contentPx}`,
  paddingRight: `${sysSizes.contentPx}`,
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
