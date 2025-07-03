import React, { useCallback, useContext, useEffect, useRef } from "react";
import Styles from "./signIn.styles";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SysForm from "../../../../../../components/sysForm/sysForm";
import SysTextField from "../../../../../../components/sysFormFields/sysTextField/sysTextField";
import SysIcon from "../../../../../../components/sysIcon/sysIcon";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import Context, { INotLoggedInUserContext } from "../notLoggedInUser.context";
import { ISysFormRef } from "../../../../../../components/sysForm/typings";
import SysImage from "/imports/components/sysImage/sysImage";
import SysFormButton from "/imports/components/sysFormFields/sysFormButton/sysFormButton";
import { useTranslation } from "react-i18next";
import { ISchema } from "../../../../../../types/schema";
import emailValidator from "/imports/libs/validators/email";

const SignInPage: React.FC = () => {
	const { t } = useTranslation("users");
	const context = useContext<INotLoggedInUserContext>(Context);
	const sysFormRef = useRef<ISysFormRef>(null);

	const navigate = useNavigate();
	const handleForgotPassword = useCallback(() => {
		const email = sysFormRef.current?.getDocValues()?.email;
		if (email) navigate(`/guest/forgot-password/${email}`);
		else navigate("/guest/forgot-password");
	}, [navigate]);

	useEffect(() => {
		if (context.hasAdminUser) return;
		navigate("/guest/create-admin-user");
	}, [context.hasAdminUser]);

	// Definição do schema dentro do componente para acessar 't'
	const signInFrontSchema: ISchema<{ email?: string; password?: string }> = {
		email: {
			type: "String",
			label: t("pages.signIn.emailLabel"), // Traduzindo o label
			optional: false,
			validationFunction: (value: string) => {
				const email = emailValidator(value);
				if (!email) return t("pages.signIn.emailInvalid"); // Traduzindo a mensagem de erro
				return undefined;
			},
			defaultValue: "adm@adm.com"
		},
		password: {
			type: "String",
			label: t("pages.signIn.passwordLabel"), // Traduzindo o label
			optional: false,
			validationFunction: (value: string) => {
				if (value.length < 6) return t("pages.signIn.passwordMinLength"); // Traduzindo a mensagem de erro
				return undefined;
			},
			defaultValue: "123456"
		}
	};

	return (
		<>
			<SysImage name="tacitoLogo" />
			<Styles.welcome>{t("pages.signIn.welcome")}</Styles.welcome>
			<Styles.subWelcome>{t("pages.signIn.subWelcome")}</Styles.subWelcome>

			<SysForm schema={signInFrontSchema} onSubmit={context.loginWithPassword} debugAlerts={false}>
				<Styles.formWrapper>
					<SysTextField
						name="email"
						label={t("pages.signIn.emailLabel")}
						fullWidth
						placeholder={t("pages.signIn.emailPlaceholder")}
					/>
					<SysTextField
						label={t("pages.signIn.passwordLabel")}
						fullWidth
						name="password"
						placeholder={t("pages.signIn.passwordPlaceholder")}
						type="password"
					/>
					<Styles.forgotPassword variant="text" onClick={handleForgotPassword}>
						{t("pages.signIn.forgotPassword")}
					</Styles.forgotPassword>
					<SysFormButton variant="contained" color="primary" fullWidth endIcon={<SysIcon name="arrowForward" />}>
						{t("pages.signIn.signInButton")}
					</SysFormButton>
				</Styles.formWrapper>
			</SysForm>

			<Styles.externalLoginContainer>
				<Button startIcon={<GitHubIcon />} onClick={context.loginWithGithub}>
					{t("pages.signIn.gitHub")}
				</Button>
				<Button startIcon={<GoogleIcon />} onClick={context.loginWithGoogle}>
					{t("pages.signIn.google")}
				</Button>
				<Button startIcon={<MicrosoftIcon />} onClick={context.loginWithMicrosoftEntra}>
					{t("pages.signIn.microsoftEntra")}
				</Button>
			</Styles.externalLoginContainer>
		</>
	);
};

export default SignInPage;
