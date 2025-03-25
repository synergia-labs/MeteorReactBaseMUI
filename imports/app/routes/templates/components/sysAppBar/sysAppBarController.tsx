import React, { ReactNode, useCallback, useContext, useRef } from "react";
import Context, { ISysAppBarContext } from "./sysAppBarContext";
import { useLocation, useNavigate } from "react-router-dom";
import SysAppBarView from "./sysAppBarView";
import AuthContext from "/imports/app/authProvider/authContext";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import { ISysMenuItem, ISysMenuRef } from "/imports/ui/components/sysMenu/sysMenuProvider";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import { hasValue } from "/imports/libs/hasValue";
import SysAvatar from "/imports/ui/components/sysAvatar/sysAvatar";
import { RouterContext } from "../../../components/routesProvider";

interface ISysAppBarController {
	logo?: ReactNode;
}

const SysAppBar: React.FC<ISysAppBarController> = ({ logo }) => {
	const { user, logout } = useContext(AuthContext);
	const { menuItens } = useContext(RouterContext);
	const { showModal } = useContext(AppLayoutContext);
	const location = useLocation();

	const navigate = useNavigate();
	const menuPerfilRef = useRef<ISysMenuRef>(null);
	const menuMobileRef = useRef<ISysMenuRef>(null);

	const onClickLogo = useCallback((): void => navigate("/"), [navigate]);

	const onLogout = useCallback(async (): Promise<void> => {
		logout(() => navigate("/"));
	}, [navigate]);

	const abrirMenuPerfil = useCallback(
		(event: React.MouseEvent<HTMLElement>): void => {
			menuPerfilRef.current?.openMenu(event);
		},
		[menuPerfilRef]
	);

	const abrirMenuMobile = useCallback(
		(event: React.MouseEvent<HTMLElement>): void => {
			menuMobileRef.current?.openMenu(event);
		},
		[menuMobileRef]
	);

	const getOpcoesMenuDeUsuario = useCallback(
		(): Array<ISysMenuItem> => [
			{
				key: "perfil",
				otherProps: {
					label: user?.profile?.name || "-",
					startIcon: <SysAvatar name={user?.profile?.name} src={user?.profile?.photo} />
				}
			},
			{
				key: "sair",
				onClick: onLogout,
				otherProps: { label: "Sair", startIcon: <SysIcon name="logout" /> }
			}
		],
		[user, showModal, onLogout]
	);

	const getOpcoesMenuMobile = useCallback(
		(): Array<ISysMenuItem> =>
			menuItens
				.map((option) => {
					if (!hasValue(option)) return null;
					return {
						key: "menu-" + option?.name,
						onClick: () => navigate(option?.path || ""),
						otherProps: {
							label: option?.name || "",
							startIcon: option?.icon
						}
					};
				})
				.filter((option) => option !== null),
		[menuItens, navigate, user]
	);

	const providerValue: ISysAppBarContext = {
		userName: user?.profile?.name || "-",
		userPhoto: user?.profile?.photo,
		menuPerfilRef,
		menuMobileRef,
		currentPath: location.pathname,
		onClickLogo,
		abrirMenuPerfil,
		abrirMenuMobile,
		getOpcoesMenuDeUsuario,
		getOpcoesMenuMobile
	};

	return (
		<Context.Provider value={providerValue}>
			<SysAppBarView logo={logo} />
		</Context.Provider>
	);
};

export default SysAppBar;
