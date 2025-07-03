import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Styles from "./enrollAccount.styles";
import SysForm from "../../../../../../components/sysForm/sysForm";
import SysTextField from "../../../../../../components/sysFormFields/sysTextField/sysTextField";
import SysIcon from "../../../../../../components/sysIcon/sysIcon";
import SysFormButton from "../../../../../../components/sysFormFields/sysFormButton/sysFormButton";
import Context, { INotLoggedInUserContext } from "../notLoggedInUser.context";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import { useTranslation } from "react-i18next";
import { ISchema } from "/imports/types/schema";
import { AuditType } from "../../../../../../types/audit";

interface IEnrollAccountSchema extends AuditType {
	password?: string;
	confirmPassword?: string;
}

export const EnrollAccountPage: React.FC = () => {
	const { token } = useParams();
	const context = useContext<INotLoggedInUserContext>(Context);
	const { showNotification } = useContext(AppLayoutContext);
	const { t } = useTranslation("users");

	const [loading, setLoading] = useState<boolean>(false);

	const enrollAccountSchema: ISchema<IEnrollAccountSchema> = {
		password: {
			type: String,
			label: t("pages.enrollAccount.passwordLabel"),
			optional: false,
			validationFunction: (value) => {
				if (value && value.length < 6) return t("pages.enrollAccount.passwordMinLength");
				return undefined;
			}
		},
		confirmPassword: {
			type: String,
			label: t("pages.enrollAccount.confirmPasswordLabel"),
			optional: false,
			validationFunction: (value, doc) => {
				if (value && value !== doc?.password) return t("pages.enrollAccount.passwordsDontMatch");
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
						title: t("pages.enrollAccount.resetPasswordFailTitle"),
						message: t("pages.enrollAccount.resetPasswordFailMessage", { errorMessage: error.message })
					});
				}
			},
			true
		);
	};

	return (
		<Styles.container>
			<Typography variant="h5">{t("pages.enrollAccount.title")}</Typography>
			<Typography variant="body2" color={(theme) => theme.palette.sysText?.auxiliary}>
				{t("pages.enrollAccount.welcomeMessage", { appName: Meteor.settings.public.appName })}
			</Typography>
			<SysForm
				schema={enrollAccountSchema}
				onSubmit={handleSubmit}
				debugAlerts={false}
				loading={loading}
				validateOnChange={["confirmPassword"]}>
				<Styles.body>
					<SysTextField
						name="password"
						fullWidth
						type="password"
						placeholder={t("pages.enrollAccount.passwordPlaceholder")}
					/>
					<SysTextField
						name="confirmPassword"
						fullWidth
						type="password"
						placeholder={t("pages.enrollAccount.confirmPasswordPlaceholder")}
					/>
				</Styles.body>
				<SysFormButton type="submit" startIcon={<SysIcon name="check" />}>
					{t("pages.enrollAccount.confirmButton")}
				</SysFormButton>
			</SysForm>
		</Styles.container>
	);
};

export default EnrollAccountPage;
