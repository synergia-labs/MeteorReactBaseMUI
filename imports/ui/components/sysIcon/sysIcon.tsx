import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import materialSymbolsIcons, { MaterialSymbolsIconsNames } from '/imports/ui/components/sysIcon/materialSymbolsIcons';

interface ISysIconProps extends SvgIconProps {
  name: MaterialSymbolsIconsNames;
}

const SysIcon: React.FC<ISysIconProps> = ({name= 'add', ...props}) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d={materialSymbolsIcons[name]} />
      </svg>

    </SvgIcon>
  );
};

export default SysIcon;
