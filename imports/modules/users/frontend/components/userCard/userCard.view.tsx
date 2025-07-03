import React, { useContext, useRef } from "react";
import { Meteor } from "meteor/meteor";
import Styles from "./userCard.styles";
import SysAvatar from "/imports/components/sysAvatar/sysAvatar";
import AuthContext from "/imports/app/authProvider/authContext";
import { IconButton } from "@mui/material";
import SysIcon from "/imports/components/sysIcon/sysIcon";
import SysTextOverflow from "/imports/components/layoutComponents/sysTextOverflow";
import SysMenu, { ISysMenuItem, ISysMenuRef } from "/imports/components/sysMenu/sysMenuProvider";
import { useTranslation } from "react-i18next";
import usersApi from "../../api";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";

interface ISysCardUserProps extends Partial<Meteor.User> {}

export const CardUser: React.FC<ISysCardUserProps> = ({ _id, profile, emails }) => {
	const { name, photo, roles, disabled } = profile || {};
	const { user } = useContext(AuthContext);
	const { showNotification } = useContext(AppLayoutContext);
	const { t } = useTranslation("users");

	const callback = (error: Meteor.Error | undefined, key?: string) => {
		if (error) return showNotification({ type: "error", error });
		return showNotification({
			type: "success",
			title: t(`components.userCard.menu.successMessage.${key}.title`),
			message: t(`components.userCard.menu.successMessage.${key}.message`)
		});
	};

	const handleEnableUser = () => usersApi.enableUser(_id, (error) => callback(error, "enableUser"));

	const handleDisableUser = () => usersApi.disableUser(_id, (error) => callback(error, "disableUser"));

	const handleSendVerificationEmail = () =>
		usersApi.sendVerificationEmail({ _id }, (error) => callback(error, "verificationEmail"));

	const handleResetPasswordEmail = () =>
		usersApi.sendResetPasswordEmail({ _id }, (error) => callback(error, "resetPassword"));

	const handleEnrolEmail = () => usersApi.sendEnrolEmail({ _id }, (error) => callback(error, "enrolEmail"));

	const photoUrl = user?._id === _id ? user?.profile?.photo : photo;
	const menuRef = useRef<ISysMenuRef | null>(null);
	const menuOptions: Array<ISysMenuItem> = [
		{
			key: "enableDisable",
			onClick: disabled ? handleEnableUser : handleDisableUser,
			otherProps: {
				label: disabled ? t("components.userCard.menu.enable") : t("components.userCard.menu.disable")
			}
		},
		{
			key: "verifyEmail",
			onClick: handleSendVerificationEmail,
			otherProps: {
				label: t("components.userCard.menu.verificationEmail")
			}
		},
		{
			key: "resetPassword",
			onClick: handleResetPasswordEmail,
			otherProps: {
				label: t("components.userCard.menu.resetPassword")
			}
		},
		{
			key: "enrolEmail",
			onClick: handleEnrolEmail,
			otherProps: {
				label: t("components.userCard.menu.enrolEmail")
			}
		}
	];

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>): void => {
		menuRef.current?.openMenu(event);
	};

	return (
		<Styles.wrapper>
			<Styles.container>
				<Styles.line>
					<SysAvatar name={name} src={photoUrl} size="large" />
					<SysTextOverflow maxLines={2} variant="subtitle1" sx={{ flex: 1 }}>
						{name}
					</SysTextOverflow>
					{disabled && <SysIcon name="block" color="error" />}
					<IconButton onClick={handleOpenMenu}>
						<SysIcon name="moreVert" />
					</IconButton>
					<SysMenu
						ref={menuRef}
						options={menuOptions}
						anchorOrigin={{ horizontal: "left", vertical: "top" }}
						transformOrigin={{ horizontal: "right", vertical: "top" }}
					/>
				</Styles.line>
				<Styles.line>
					<SysTextOverflow maxLines={1} variant="body2" sx={{ flex: 1 }} color={(theme) => theme.palette.sysText.auxiliary}>
						{emails?.[0].address}
					</SysTextOverflow>
					<SysTextOverflow maxLines={1} variant="body2" color={(theme) => theme.palette.sysText.auxiliary}>
						{roles?.join(", ")}
					</SysTextOverflow>
				</Styles.line>
			</Styles.container>
		</Styles.wrapper>
	);
};

export default CardUser;
