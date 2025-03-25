import React, { useContext, useEffect } from "react";
import Styles from "./createAdminUser.styles";
import SysForm from "../../../../../../components/sysForm/sysForm";
import SysTextField from "../../../../../../components/sysFormFields/sysTextField/sysTextField";
import SysFormButton from "../../../../../../components/sysFormFields/sysFormButton/sysFormButton";
import SysIcon from "../../../../../../components/sysIcon/sysIcon";
import Typography from "@mui/material/Typography";
import enumUserRoles from "/imports/modules/userprofile/common/enums/enumUserRoles";
import Context, { INotLoggedInUserContext } from "../notLoggedInUser.context";
import createUserFrontSchema from "./createAdminUser.schema";
import { useNavigate } from "react-router-dom";

const CreateAdminUserPage: React.FC = () => {
	const { createUser, hasAdminUser } = useContext<INotLoggedInUserContext>(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (hasAdminUser) navigate("/forbidden");
	}, [hasAdminUser]);

	return (
		<Styles.container>
			<Typography variant="h5" textAlign={"center"}>
				Registro de usuário administrador
			</Typography>
			<Typography variant="caption" color={(theme) => theme.palette.sysAction?.auxiliary}>
				Não foi encontrado nenhum usuário administrador cadastrado no sistema. Por favor, registre um novo usuário
				administrador.
			</Typography>
			<SysForm schema={createUserFrontSchema} onSubmit={createUser} doc={{ roles: [enumUserRoles.ADMIN] }}>
				<Styles.formContainer>
					<SysTextField name="name" label="Nome" fullWidth placeholder="Digite seu email" />
					<SysTextField name="email" label="Email" fullWidth placeholder="Digite seu email" />
					<SysTextField name="password" label="Senha" fullWidth placeholder="Digite sua senha" />
				</Styles.formContainer>

				<SysFormButton variant="contained" color="primary" endIcon={<SysIcon name={"arrowForward"} />}>
					Cadastrar
				</SysFormButton>
			</SysForm>
		</Styles.container>
	);
};

export default CreateAdminUserPage;
