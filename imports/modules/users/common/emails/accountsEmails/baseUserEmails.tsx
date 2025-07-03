import React, { ReactNode } from "react";
import Styles from "./baseUserEmailsStyles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import enumSupportedLanguages from "/imports/services/internationalization/common/enum/supportedLanguages";
import { Meteor } from "meteor/meteor";

interface IBaseEmailsProps {
	title?: string;
	children?: ReactNode;
	user: Meteor.User;
}

const BaseUserEmails: React.FC<IBaseEmailsProps> = ({ title, children, user }) => {
	const { i18n } = useTranslation();
	const t = i18n.getFixedT(user.profile?.languagePreference ?? enumSupportedLanguages.EN, "users");
	const currentYear = new Date().getFullYear();
	return (
		<Styles.container>
			<Box sx={{ textAlign: "center" }}>
				<img src={`${Meteor.absoluteUrl()}images/tacito_logo_fixed.svg`} />
			</Box>
			<Styles.content>
				<Typography variant="h3" sx={{ mb: 2 }}>
					{title}
				</Typography>
				{children}
			</Styles.content>
			<Styles.footer>
				<Typography variant="body2" color="textSecondary">
					{t("emails.baseEmail.ignoreMessage")}
				</Typography>
				<Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
					<span dangerouslySetInnerHTML={{ __html: t("emails.baseEmail.helpMessage") }} />
				</Typography>
				<Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
					{t("emails.baseEmail.copyright", { currentYear })}
				</Typography>
			</Styles.footer>
		</Styles.container>
	);
};

export default BaseUserEmails;
