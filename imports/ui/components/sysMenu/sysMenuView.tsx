import React, { ElementType, ReactNode, useContext } from 'react';
import Context, { ISysMenuContext } from './sysMenuContext';
import { MenuProps } from '@mui/material/Menu';
import Styles from './sysMenuStyles';
import SysMenuItemDefault from './components/sysMenuItemDefault';
import RenderWithPermission from '/imports/security/ui/components/renderWithPermission';

const SysMenuView: React.FC<Omit<MenuProps, 'open' | 'anchorEl' | 'onClose'>> = ({ 
  children,
  ...menuProps 
}) => {
  const context = useContext<ISysMenuContext>(Context);
  const ContentContainer: ElementType = context?.contentContainer ?? Styles.conteudoContainer;
  return (
    <Styles.container
      anchorEl={context.anchorEl}
      open={context.open}
      {...menuProps}
      onClose={context.closeMenu}
      slotProps={menuProps.slotProps || (context.activeArrow ? Styles.menuSlotProps : undefined)}
    >
      {!!children ? children : (
        <ContentContainer>
          {context?.options?.map((option) => {
            const Component: ElementType =  option?.component || context?.menuItemDedaultComponent || SysMenuItemDefault;
            
            return (
              <RenderWithPermission key={option?.key} resources={option?.resources}>
                <Component onClick={option.onClick} {...option?.otherProps} />
              </RenderWithPermission>
            )
          })}
        </ContentContainer>
      )}
    </Styles.container>
  );
};

export default SysMenuView;
