import React, { useContext } from "react";
import Styles from "./createAdminUser.styles";
import SysForm from "/imports/ui/components/sysForm/sysForm";
import SysTextField from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import SysFormButton from "/imports/ui/components/sysFormFields/sysFormButton/sysFormButton";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import Typography from "@mui/material/Typography";
import EnumUserRoles from "/imports/modules/userprofile/common/enums/enumUserRoles";
import Context, { INotLoggedInUserContext } from "../notLoggedInUser.context";
import createUserFrontSchema from "./createAdminUser.schema";

const CreateAdminUserPage: React.FC = () => {
	const context = useContext<INotLoggedInUserContext>(Context);

	return (
		<Styles.container>
			<Typography variant="h5" textAlign={"center"}>
				Registro de usuário administrador
			</Typography>
			<Typography variant="caption" color={(theme) => theme.palette.sysAction?.auxiliary}>
				Não foi encontrado nenhum usuário administrador cadastrado no sistema. Por favor, registre um novo usuário
				administrador.
			</Typography>
			<SysForm schema={createUserFrontSchema} onSubmit={context.createUser} doc={{ roles: [EnumUserRoles.ADMIN] }}>
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
