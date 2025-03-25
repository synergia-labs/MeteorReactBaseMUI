// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "./forgotPassword.styles";
import SysForm from "../../../../../../components/sysForm/sysForm";
import SysTextField from "../../../../../../components/sysFormFields/sysTextField/sysTextField";
import emailValidator from "/imports/libs/validators/email";
import SysIcon from "../../../../../../components/sysIcon/sysIcon";
import SysFormButton from "../../../../../../components/sysFormFields/sysFormButton/sysFormButton";
import Context, { INotLoggedInUserContext } from "../notLoggedInUser.context";
import Collapse from "@mui/material/Collapse";

export const ForgotPasswordPage: React.FC = () => {
	const { email } = useParams();
	const context = useContext<INotLoggedInUserContext>(Context);

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
			label: "Email",
			optional: false,
			validationFunction: (value: string) => {
				if (!emailValidator(value)) return "Email inválido";
				return undefined;
			}
		}
	};

	return (
		<Styles.container>
			<Typography variant="h5">{isEmailSent ? "Agora é só aguardar!" : "Esqueceu sua senha?"}</Typography>
			<SysForm schema={schema} onSubmit={handleSubmit} debugAlerts={false} loading={loading} doc={{ email }}>
				<Styles.body>
					<Typography textAlign="center" color={(theme) => theme.palette.sysText?.body}>
						{isEmailSent
							? "Caso o e-mail informado esteja cadastrado no sistema, enviaremos um link para a redefinição de sua senha"
							: "Confirme seu e-mail abaixo para receber um link de redefinição da sua senha"}
					</Typography>
					<Collapse in={!isEmailSent} sx={{ width: "100%" }}>
						<SysTextField name="email" placeholder="Ex.: jose@email.com" />
					</Collapse>
				</Styles.body>
				{isEmailSent ? (
					<Button startIcon={<SysIcon name="arrowBack" />} onClick={onCancelClick}>
						Voltar para o Login
					</Button>
				) : (
					<Styles.footer>
						<Button startIcon={<SysIcon name="close" />} variant="outlined" onClick={onCancelClick} disabled={loading}>
							Cancelar
						</Button>
						<SysFormButton startIcon={<SysIcon name="check" />}>Confirmar</SysFormButton>
					</Styles.footer>
				)}
			</SysForm>
		</Styles.container>
	);
};

export default ForgotPasswordPage;
