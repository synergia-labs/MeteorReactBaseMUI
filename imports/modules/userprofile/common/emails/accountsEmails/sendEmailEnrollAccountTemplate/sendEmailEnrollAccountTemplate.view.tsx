import React from "react";
import { Meteor } from "meteor/meteor";
import renderHtmlServerSide from "/imports/base/services/email/utils/renderHtmlServerSide";
import Styles from "./sendEmailEnrollAccountTemplate.styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import BaseUserEmails from "../baseUserEmials";

interface ISendEmailVerificationProps {
	user: Meteor.User;
	url: string;
}

const SendEmailEnrollAccount: React.FC<ISendEmailVerificationProps> = ({ user, url }) => {
	return (
		<BaseUserEmails title={`Olá, ${user.profile?.name || user?.emails?.[0]?.address}`}>
			<Typography>
				Seu cadastro no <strong>{Meteor.settings.public.appName}</strong> foi realizado por um administrador.
			</Typography>
			<Typography>Clique no link abaixo para criar sua senha de acesso:</Typography>
			<Link href={url}>
				<Styles.buttonContainer>Definir senha</Styles.buttonContainer>
			</Link>
			<Typography variant="caption" color={(theme) => theme.palette.sysText?.auxiliary}>
				Agradecemos por se cadastrar no <strong>{Meteor.settings.public.appName}</strong>. Esta é uma mensagem gerada
				automaticamente. Por favor, não responda a este e-mail.
			</Typography>
		</BaseUserEmails>
	);
};

const enrollAccountEmailTemplate = (): EmailFields => ({
	subject() {
		return `${Meteor.settings.public.appName} - Cadastro de usuário`;
	},
	html(user, url) {
		return renderHtmlServerSide(<SendEmailEnrollAccount user={user as Meteor.User} url={url} />);
	}
});

export default enrollAccountEmailTemplate;
