import React, { Fragment, ReactNode, useContext } from "react";
import Styles from "./sysAppBarStyles";
import Context, { ISysAppBarContext } from "./sysAppBarContext";
import SysIcon from "../../../../../components/sysIcon/sysIcon";
import { SysNavLink } from "../../../../../components/sysNavLink/sysNavLink";
import SysMenu from "../../../../../components/sysMenu/sysMenuProvider";
import SysAvatar from "../../../../../components/sysAvatar/sysAvatar";
import { hasValue } from "/imports/libs/hasValue";
import { RouterContext } from "/imports/app/routes/components/routesProvider";

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
						return hasValue(option) ? (
							<SysNavLink key={option?.path} sysOptions={option!} active={option.path == controller.currentPath} />
						) : undefined;
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
