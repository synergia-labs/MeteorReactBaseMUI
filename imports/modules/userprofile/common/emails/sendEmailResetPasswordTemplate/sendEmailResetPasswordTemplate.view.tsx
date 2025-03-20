import React from "react";
import { Meteor } from "meteor/meteor";
import renderHtmlServerSide from "/imports/base/services/email/utils/renderHtmlServerSide";
import BaseUserEmails from "../baseUserEmails/baseUserEmials";
import Styles from "./sendEmailResetPasswordTemplate.styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

interface ISendEmailVerificationProps {
	user: Meteor.User;
	url: string;
}

const SendEmailVerification: React.FC<ISendEmailVerificationProps> = ({ user, url }) => {
	return (
		<BaseUserEmails title={`Olá, ${user.profile?.name || user?.emails?.[0]?.address}`}>
			<Typography>
				Sua senha de acesso ao <strong>{Meteor.settings.public.appName}</strong> será alterada.
			</Typography>
			<Typography>Clique no link abaixo e informe uma nova senha:</Typography>
			<Link href={url}>
				<Styles.buttonContainer>Alterar senha</Styles.buttonContainer>
			</Link>
			<Typography variant="caption" color={(theme) => theme.palette.sysText?.auxiliary}>
				Agradecemos por se cadastrar no <strong>{Meteor.settings.public.appName}</strong>. Esta é uma mensagem gerada
				automaticamente. Por favor, não responda a este e-mail.
			</Typography>
		</BaseUserEmails>
	);
};

const resetPasswordEmailTemplate = (): EmailFields => ({
	subject() {
		return `${Meteor.settings.public.appName} - Redefinição de senha`;
	},
	html(user, url) {
		return renderHtmlServerSide(<SendEmailVerification user={user as Meteor.User} url={url} />);
	}
});

export default resetPasswordEmailTemplate;
