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
import resetPasswordFrontSchema from "./resetPassword.schema";

export const ResetPasswordPage: React.FC = () => {
	const { token } = useParams();
	const context = useContext<INotLoggedInUserContext>(Context);
	const { showNotification } = useContext(AppLayoutContext);

	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = (_doc: { password: string }) => {
		setLoading(true);
		context.resetUserPassword(token as string, _doc.password, (error) => {
			setLoading(false);
			if (error) {
				showNotification({
					type: "error",
					title: "Falha ao redefinir senha",
					message: `Mensagem de erro: ${error}`
				});
			}
		});
	};

	return (
		<Styles.container>
			<Typography variant="h5">Redefinição de senha</Typography>
			<SysForm
				schema={resetPasswordFrontSchema}
				onSubmit={handleSubmit}
				debugAlerts={false}
				loading={loading}
				validateOnChange={["confirmPassword"]}>
				<Styles.body>
					<SysTextField name="password" fullWidth type="password" placeholder="Digite uma senha segura" />
					<SysTextField name="confirmPassword" fullWidth type="password" placeholder="Confirme a senha" />
				</Styles.body>
				<SysFormButton startIcon={<SysIcon name="check" />}>Confirmar</SysFormButton>
			</SysForm>
		</Styles.container>
	);
};

export default ResetPasswordPage;
