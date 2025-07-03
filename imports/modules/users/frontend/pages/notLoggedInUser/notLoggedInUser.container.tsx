import React, { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import AuthContext, { IAuthContext } from "/imports/app/authProvider/authContext";
import { CreateUserType } from "../../../common/types/createUser";
import Context, { INotLoggedInUserContext } from "./notLoggedInUser.context";
import { useNavigate } from "react-router-dom";
import usersApi from "../../api";
import { Meteor } from "meteor/meteor";
import { useTranslation } from "react-i18next";

interface INotLoggedInUserContainerProps {
	children?: ReactNode;
}

const NotLoggedInUserContainer: React.FC<INotLoggedInUserContainerProps> = ({ children }) => {
	const { showNotification, showDialog } = useContext(AppLayoutContext);
	const { user } = useContext<IAuthContext>(AuthContext);
	const [hasAdminUser, setHasAdminUser] = useState<boolean>(true);
	const navigate = useNavigate();
	const { t } = useTranslation("users");

	useEffect(() => {
		if (user) return;
		usersApi.checkIfHasAdminUser(undefined, (error, result) => {
			if (error)
				return showNotification({
					type: "error",
					error
				});
			setHasAdminUser(result);
		});
	}, [user, showNotification, t]);

	const createUser = useCallback(
		(doc: CreateUserType) => {
			usersApi.createUser(doc, (error) => {
				if (error)
					return showNotification({
						type: "error",
						error
					});
				showNotification({
					type: "success",
					title: t("pages.notLoggedInUser.notifications.userCreatedTitle"),
					message: t("pages.notLoggedInUser.notifications.userCreatedMessage", { userName: doc.profile.name })
				});
				if (!hasAdminUser) setHasAdminUser(true);
				navigate("/guest/sign-in");
			});
		},
		[hasAdminUser, navigate, showNotification, t]
	);

	const callBackLogin = useCallback(
		(error: any) => {
			if (error)
				return showNotification({
					type: "error",
					error
				});
			navigate("/");
		},
		[navigate, showNotification, t]
	);

	const sendResetPasswordEmail = useCallback((email: string, callback: (error: Meteor.Error) => void) => {
		usersApi.sendResetPasswordEmail({ email }, callback);
	}, []);

	const resetUserPassword = useCallback(
		(
			token: string,
			newPassword: string,
			callback: (error?: Error | Meteor.Error) => void,
			enrollAccount: boolean = false
		) => {
			usersApi.resetForgotPassword(token, newPassword, (error) => {
				if (!error) {
					navigate("/");
					showDialog({
						title: enrollAccount
							? t("pages.notLoggedInUser.notifications.enrollAccountSuccessTitle")
							: t("pages.notLoggedInUser.notifications.resetPasswordSuccessTitle"),
						message: enrollAccount
							? t("pages.notLoggedInUser.notifications.enrollAccountSuccessMessage")
							: t("pages.notLoggedInUser.notifications.resetPasswordSuccessMessage"),
						confirmButtonLabel: t("pages.notLoggedInUser.dialogs.okButton")
					});
				}
				callback(error);
			});
		},
		[navigate, showDialog, t]
	);

	const verifyEmail = useCallback(
		(token: string, callback: (error?: Error | Meteor.Error) => void) => usersApi.verifyEmail(token, callback),
		[]
	);

	const loginWithGithub = useCallback(
		() => Meteor.loginWithGithub({ requestPermissions: ["user"] }, callBackLogin),
		[callBackLogin]
	);

	const loginWithGoogle = useCallback(() => Meteor.loginWithGoogle({}, callBackLogin), [callBackLogin]);
	const loginWithPassword = useCallback(
		({ email, password }: { email: string; password: string }) => {
			Meteor.loginWithPassword(email, password, callBackLogin);
		},
		[callBackLogin]
	);

	const loginWithMicrosoftEntra = useCallback(() => {
		Meteor.loginWithMicrosoft(
			{
				requestPermissions: ["user.read", "mail.read"]
			},
			callBackLogin
		);
	}, [callBackLogin]);

	const contextValues: INotLoggedInUserContext = {
		hasAdminUser: hasAdminUser,
		createUser: createUser,
		loginWithGithub: loginWithGithub,
		loginWithGoogle: loginWithGoogle,
		loginWithPassword: loginWithPassword,
		sendResetPasswordEmail: sendResetPasswordEmail,
		resetUserPassword: resetUserPassword,
		loginWithMicrosoftEntra: loginWithMicrosoftEntra,
		verifyEmail: verifyEmail
	};

	return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export default NotLoggedInUserContainer;
