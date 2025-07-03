import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Styles from "./resetPassword.styles";
import SysForm from "../../../../../../components/sysForm/sysForm";
import SysTextField from "../../../../../../components/sysFormFields/sysTextField/sysTextField";
import SysIcon from "../../../../../../components/sysIcon/sysIcon";
import SysFormButton from "../../../../../../components/sysFormFields/sysFormButton/sysFormButton";
import Context, { INotLoggedInUserContext } from "../notLoggedInUser.context";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import { useTranslation } from "react-i18next";
import { ISchema } from "/imports/types/schema";
import { AuditType } from "/imports/types/audit";

interface IResetForgotPasswordSchema extends AuditType {
	password: string;
	confirmPassword: string;
}

export const ResetPasswordPage: React.FC = () => {
	const { token } = useParams();
	const context = useContext<INotLoggedInUserContext>(Context);
	const { showNotification } = useContext(AppLayoutContext);
	const { t } = useTranslation("users");

	const [loading, setLoading] = useState<boolean>(false);

	const resetPasswordFrontSchema: ISchema<IResetForgotPasswordSchema> = {
		password: {
			type: String,
			label: t("pages.resetPassword.passwordLabel"),
			optional: false,
			validationFunction: (value, _doc) => {
				if (value.length < 6) return t("pages.resetPassword.minimum6");
				return undefined;
			}
		},
		confirmPassword: {
			type: String,
			label: t("pages.resetPassword.confirmPasswordLabel"),
			optional: false,
			validationFunction: (value, doc) => {
				if (value != doc?.password) return t("pages.resetPassword.dontMatch");
				return undefined;
			}
		}
	};

	const handleSubmit = (_doc: { password: string }) => {
		setLoading(true);
		context.resetUserPassword(
			token as string,
			_doc.password,
			(error) => {
				setLoading(false);
				if (error) {
					showNotification({
						type: "error",
						title: t("pages.resetPassword.resetPasswordFailTitle"),
						message: t("pages.resetPassword.resetPasswordFailMessage", { errorMessage: error.message })
					});
				}
			},
			false
		);
	};

	return (
		<Styles.container>
			<Typography variant="h5">{t("pages.resetPassword.title")}</Typography>
			<SysForm
				schema={resetPasswordFrontSchema}
				onSubmit={handleSubmit}
				debugAlerts={false}
				loading={loading}
				validateOnChange={["confirmPassword"]}>
				<Styles.body>
					<SysTextField
						name="password"
						fullWidth
						type="password"
						placeholder={t("pages.resetPassword.passwordPlaceholder")}
					/>
					<SysTextField
						name="confirmPassword"
						fullWidth
						type="password"
						placeholder={t("pages.resetPassword.confirmPasswordPlaceholder")}
					/>
				</Styles.body>
				<SysFormButton type="submit" startIcon={<SysIcon name="check" />}>
					{t("pages.resetPassword.confirmButton")}
				</SysFormButton>
			</SysForm>
		</Styles.container>
	);
};

export default ResetPasswordPage;
