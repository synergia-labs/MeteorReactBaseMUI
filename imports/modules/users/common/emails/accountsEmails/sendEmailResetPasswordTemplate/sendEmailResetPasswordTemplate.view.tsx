import React from "react";
import { Meteor } from "meteor/meteor";
import renderHtmlServerSide from "../../../../../../services/email/utils/renderHtmlServerSide";
import Styles from "./sendEmailResetPasswordTemplate.styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import BaseUserEmails from "../baseUserEmails";
import { useTranslation } from "react-i18next";
import enumSupportedLanguages from "/imports/services/internationalization/common/enum/supportedLanguages";
import { renderToString } from "react-dom/server";

interface ISendEmailVerificationProps {
	user: Meteor.User;
	url: string;
}

const SendEmailVerification: React.FC<ISendEmailVerificationProps> = ({ user, url }) => {
	const { i18n } = useTranslation();
	const t = i18n.getFixedT(user.profile?.languagePreference ?? enumSupportedLanguages.EN, "users");

	const userName = user.profile?.name || user?.emails?.[0]?.address;
	const appName = Meteor.settings.public.appName;

	return (
		<BaseUserEmails title={t("emails.resetPassword.title", { userName })} user={user}>
			<Typography>
				<span dangerouslySetInnerHTML={{ __html: t("emails.resetPassword.body1", { appName }) }} />
			</Typography>
			<Typography>{t("emails.resetPassword.body2")}</Typography>
			<Link href={url}>
				<Styles.buttonContainer>{t("emails.resetPassword.button")}</Styles.buttonContainer>
			</Link>
			<Typography variant="caption" color={(theme) => theme.palette.sysText?.auxiliary}>
				<span dangerouslySetInnerHTML={{ __html: t("emails.resetPassword.footer", { appName }) }} />
			</Typography>
		</BaseUserEmails>
	);
};

interface ISendEmailSubjectProps {
	user: Meteor.User;
}

const SendEmailSuject: React.FC<ISendEmailSubjectProps> = ({ user }) => {
	const { i18n } = useTranslation();
	const t = i18n.getFixedT(user.profile?.languagePreference ?? enumSupportedLanguages.EN, "users");
	const appName = Meteor.settings.public.appName;
	return t("emails.resetPassword.subject", { appName });
};

const resetPasswordEmailTemplate = (): EmailFields => ({
	subject(user) {
		return renderToString(<SendEmailSuject user={user as Meteor.User} />);
	},
	html(user, url) {
		return renderHtmlServerSide(<SendEmailVerification user={user as Meteor.User} url={url} />);
	}
});

export default resetPasswordEmailTemplate;
