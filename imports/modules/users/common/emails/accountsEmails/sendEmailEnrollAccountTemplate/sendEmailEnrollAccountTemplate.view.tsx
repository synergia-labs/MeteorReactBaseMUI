import React from "react";
import { Meteor } from "meteor/meteor";
import { renderToString } from "react-dom/server";
import renderHtmlServerSide from "../../../../../../services/email/utils/renderHtmlServerSide";
import Styles from "./sendEmailEnrollAccountTemplate.styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import BaseUserEmails from "../baseUserEmails";
import { useTranslation } from "react-i18next";
import enumSupportedLanguages from "/imports/services/internationalization/common/enum/supportedLanguages";

interface ISendEmailEnrollAccountProps {
	user: Meteor.User;
	url: string;
}

const SendEmailEnrollAccount: React.FC<ISendEmailEnrollAccountProps> = ({ user, url }) => {
	const { i18n } = useTranslation();
	const t = i18n.getFixedT(user.profile?.languagePreference ?? enumSupportedLanguages.EN, "users");

	const userName = user.profile?.name || user?.emails?.[0]?.address;
	const appName = Meteor.settings.public.appName;

	return (
		<BaseUserEmails title={t("emails.enrollAccount.title", { userName })} user={user}>
			<Typography>
				<span dangerouslySetInnerHTML={{ __html: t("emails.enrollAccount.body1", { appName }) }} />
			</Typography>
			<Typography>{t("emails.enrollAccount.body2")}</Typography>
			<Link href={url}>
				<Styles.buttonContainer>{t("emails.enrollAccount.button")}</Styles.buttonContainer>
			</Link>
			<Typography variant="caption" color={(theme) => theme.palette.sysText?.auxiliary}>
				<span dangerouslySetInnerHTML={{ __html: t("emails.enrollAccount.footer", { appName }) }} />
			</Typography>
		</BaseUserEmails>
	);
};

interface ISendEmailSubjectProps {
	user: Meteor.User;
}

const SendEmailSubject: React.FC<ISendEmailSubjectProps> = ({ user }) => {
	const { i18n } = useTranslation();
	const t = i18n.getFixedT(user.profile?.languagePreference ?? enumSupportedLanguages.EN, "users");
	const appName = Meteor.settings.public.appName;
	return t("emails.enrollAccount.subject", { appName });
};

const enrollAccountEmailTemplate = (): EmailFields => ({
	subject(user) {
		return renderToString(<SendEmailSubject user={user as Meteor.User} />);
	},
	html(user, url) {
		return renderHtmlServerSide(<SendEmailEnrollAccount user={user as Meteor.User} url={url} />);
	}
});

export default enrollAccountEmailTemplate;
