// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "./forgotPassword.styles";
import SysForm from "../../../../../../components/sysForm/sysForm";
import SysTextField from "../../../../../../components/sysFormFields/sysTextField/sysTextField";
import emailValidator from "/imports/libs/validators/email";
import SysIcon from "../../../../../../components/sysIcon/sysIcon";
import Context, { INotLoggedInUserContext } from "../notLoggedInUser.context";
import { useTranslation } from "react-i18next";
import { Typography, Collapse, Button } from "@mui/material";

export const ForgotPasswordPage: React.FC = () => {
	const { email } = useParams();
	const context = useContext<INotLoggedInUserContext>(Context);
	const { t } = useTranslation("users");

	const [loading, setLoading] = useState<boolean>(false);
	const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleSubmit = (_doc: { email: string }) => {
		setLoading(true);
		context.sendResetPasswordEmail(_doc.email, (_) => {
			setLoading(false);
			setIsEmailSent(true);
		});
	};

	const onCancelClick = () => navigate("/guest/sign-in");

	const schema = {
		email: {
			type: String,
			label: t("pages.signIn.emailLabel"),
			optional: false,
			validationFunction: (value: string) => {
				if (!emailValidator(value)) return t("pages.forgotPassword.emailInvalid");
				return undefined;
			}
		}
	};

	return (
		<Styles.container>
			<Typography variant="h5">
				{isEmailSent ? t("pages.forgotPassword.awaitingEmail") : t("pages.forgotPassword.title")}
			</Typography>
			<SysForm schema={schema} onSubmit={handleSubmit} debugAlerts={false} loading={loading} doc={{ email }}>
				<Styles.body>
					<Typography textAlign="center" color={(theme) => theme.palette.sysText?.body}>
						{isEmailSent ? t("pages.forgotPassword.emailSentMessage") : t("pages.forgotPassword.emailConfirmationMessage")}
					</Typography>
					<Collapse in={!isEmailSent} sx={{ width: "100%" }}>
						<SysTextField name="email" placeholder={t("pages.forgotPassword.emailPlaceholder")} />
					</Collapse>
				</Styles.body>
				{isEmailSent ? (
					<Button startIcon={<SysIcon name="arrowBack" />} onClick={onCancelClick}>
						{t("pages.forgotPassword.backToLoginButton")}
					</Button>
				) : (
					<Styles.footer>
						<Styles.cancelButton
							startIcon={<SysIcon name="close" />}
							variant="outlined"
							onClick={onCancelClick}
							disabled={loading}>
							{t("pages.forgotPassword.cancelButton")}
						</Styles.cancelButton>
						<Styles.submitButton type="submit" startIcon={<SysIcon name="check" />}>
							{t("pages.forgotPassword.confirmButton")}
						</Styles.submitButton>
					</Styles.footer>
				)}
			</SysForm>
		</Styles.container>
	);
};

export default ForgotPasswordPage;
