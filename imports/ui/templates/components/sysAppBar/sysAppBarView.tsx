import React, { Fragment, ReactNode, useContext } from "react";
import Styles from "./sysAppBarStyles";
import Context, { ISysAppBarContext } from "./sysAppBarContext";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import { SysNavLink } from "/imports/ui/components/sysNavLink/sysNavLink";
import SysMenu from "/imports/ui/components/sysMenu/sysMenuProvider";
import SysAvatar from "/imports/ui/components/sysAvatar/sysAvatar";
import { RouterContext } from "../../../../app/routes/components/routesProvider";
import { hasValue } from "/imports/libs/hasValue";

interface ISysAppBar {
	logo?: ReactNode;
}

const SysAppBarView: React.FC<ISysAppBar> = ({ logo }) => {
	const controller = useContext<ISysAppBarContext>(Context);
	const { menuItens } = useContext(RouterContext);

	return (
		<Styles.wrapper>
			<Styles.container>
				{logo}
				<Styles.navContainerDesktop>
					{menuItens.map((option) => {
						return hasValue(option) ? <SysNavLink key={option?.path} sysOptions={option!} /> : undefined;
					})}
				</Styles.navContainerDesktop>
				<Styles.navContainerMobile>
					<Fragment>
						<Styles.iconButton onClick={controller.abrirMenuMobile}>
							<SysIcon name="menu" sx={{ width: "24px", height: "24px" }} />
						</Styles.iconButton>
						<SysMenu
							ref={controller.menuMobileRef}
							options={controller.getOpcoesMenuMobile()}
							activeArrow
							anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
							transformOrigin={{ horizontal: "right", vertical: "top" }}
						/>
					</Fragment>
				</Styles.navContainerMobile>
				<Fragment>
					<SysAvatar
						src={controller.userPhoto}
						name={controller.userName}
						activateOutline
						onClick={controller.abrirMenuPerfil}
						size="large"
					/>
					<SysMenu
						ref={controller.menuPerfilRef}
						options={controller.getOpcoesMenuDeUsuario()}
						activeArrow
						anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						transformOrigin={{ horizontal: "right", vertical: "top" }}
					/>
				</Fragment>
			</Styles.container>
		</Styles.wrapper>
	);
};

export default SysAppBarView;
