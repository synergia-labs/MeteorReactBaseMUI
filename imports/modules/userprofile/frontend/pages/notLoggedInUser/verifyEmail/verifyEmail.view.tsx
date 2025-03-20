import React, { useContext, useEffect, useState } from "react";
import Styles from "./verifyEmail.styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SysLoading } from "/imports/ui/components/sysLoading/sysLoading";
import { useNavigate, useParams } from "react-router-dom";
import Context, { INotLoggedInUserContext } from "../notLoggedInUser.context";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";

const VerifyEmailPage: React.FC = () => {
	const { token } = useParams();
	const { verifyEmail } = useContext<INotLoggedInUserContext>(Context);
	const { showDialog } = useContext(AppLayoutContext);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		verifyEmail(token as string, (error) => {
			setLoading(false);
			if (error)
				showDialog({
					title: "Erro ao verificar email",
					message: `Ocorreu um erro ao verificar o email. Mensagem de erro: ${error}`,
					confirmButtonLabel: "Ok",
					onClose: () => navigate("/")
				});
		});
	}, []);

	const navigate = useNavigate();
	const onClick = () => navigate("/");

	return (
		<Styles.container>
			{loading ? (
				<SysLoading label="Verificando email..." />
			) : (
				<>
					<Typography variant="h5">Bem-vindo!</Typography>
					<Typography textAlign="center" color={(theme) => theme.palette.sysText?.body}>
						Seu e-mail foi verificado com sucesso! Agora você pode acessar sua conta e aproveitar todos os recursos
						disponíveis.
					</Typography>
					<Typography textAlign="center" color={(theme) => theme.palette.sysText?.body}>
						Clique no botão abaixo para continuar e desfrutar da melhor experiência.
					</Typography>
					<Button variant="contained" color="primary" onClick={onClick}>
						Continuar
					</Button>
				</>
			)}
		</Styles.container>
	);
};

export default VerifyEmailPage;
