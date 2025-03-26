import React, { ReactNode, useCallback, useContext, useRef } from "react";
import Context, { ISysAppBarContext } from "./sysAppBarContext";
import { useLocation, useNavigate } from "react-router-dom";
import SysAppBarView from "./sysAppBarView";
import AuthContext from "/imports/app/authProvider/authContext";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import { hasValue } from "/imports/libs/hasValue";
import { RouterContext } from "../../../components/routesProvider";
import { ISysMenuItem, ISysMenuRef } from "/imports/components/sysMenu/sysMenuProvider";
import SysAvatar from "/imports/components/sysAvatar/sysAvatar";
import SysIcon from "/imports/components/sysIcon/sysIcon";

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
		logout(() => navigate("/guest/sign-in"));
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
					startIcon: <SysAvatar name={user?.profile?.name} src={user?.profile?.photo?.toString()} />
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
		userPhoto: user?.profile?.photo as string,
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
