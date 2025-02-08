import React, { Fragment, ReactNode, useContext } from 'react';
import Styles from './sysAppBarStyles';
import Context, { ISysAppBarContext } from './sysAppBarContext';
import sysRoutes from '/imports/app/routes/routes';
import { SysAvatar } from '/imports/ui/components/sysAvatar/sysAvatar';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { SysNavLink } from '/imports/ui/components/sysNavLink/sysNavLink';
import SysMenu from '/imports/ui/components/sysMenu/sysMenuProvider';

interface ISysAppBar{
  logo?: ReactNode;
}

const SysAppBarView: React.FC<ISysAppBar> = ({logo}) => {
  const controller = useContext<ISysAppBarContext>(Context);
  
  return (
    <Styles.wrapper>
      <Styles.container>
        {logo}
        <Styles.navContainerDesktop>
          {controller.menuOptions.map(option => (
            // <RenderComPermissao key={option?.name} recursos={option?.resources}>
              <SysNavLink
                active={sysRoutes.checkIsActiveRoute(option?.path)}
                sysOptions={option!}
              />
            // </RenderComPermissao>
          ))}
        </Styles.navContainerDesktop>
        <Styles.navContainerMobile>
          <Fragment>
            <Styles.iconButton onClick={controller.abrirMenuMobile}>
              <SysIcon name='menu' sx={{ width: '24px', height: '24px' }}/>
            </Styles.iconButton>
            <SysMenu
              ref={controller.menuMobileRef}
              options={controller.getOpcoesMenuMobile()}
              activeArrow
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            />

          </Fragment>
        </Styles.navContainerMobile>
        <Fragment>
          <SysAvatar 
            name={ controller.userName } 
            // ativarContorno
            onClick={controller.abrirMenuPerfil}
            // size='large'
          />
          <SysMenu
              ref={controller.menuPerfilRef}
              options={controller.getOpcoesMenuDeUsuario()}
              activeArrow
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            />
        </Fragment>
      </Styles.container>
    </Styles.wrapper>
  );
};

export default SysAppBarView;