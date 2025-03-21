import React, { useContext } from "react";
import Styles from "./usersDetail.styles";
import Typography from "@mui/material/Typography";
import Context, { IUsersDetailContext } from "./usersDetail.context";
import SysTextField from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import { SysSelectField } from "/imports/ui/components/sysFormFields/sysSelectField/sysSelectField";
import { SysLoading } from "/imports/ui/components/sysLoading/sysLoading";
import SysForm from "/imports/ui/components/sysForm/sysForm";
import userDetailFrontSchema from "./usersDetail.schema";

const UserDetailView: React.FC = () => {
	const context = useContext<IUsersDetailContext>(Context);

	return (
		<Styles.container>
			{context.loadingData ? (
				<SysLoading sxMap={{ container: { margin: "auto" } }} label="Carregando informações..." />
			) : (
				<>
					<Typography variant="subtitle1">{context.state === "create" ? "Adicionar usuário" : "Editar usuário"}</Typography>
					<SysForm schema={userDetailFrontSchema}>
						<SysTextField name="name" placeholder="Ex.: José da Silva" />
						<SysTextField name="email" placeholder="Ex.: jose.silva@email.com" />
						<SysTextField
							name="password"
							placeholder="Digite uma senha forte"
							type="password"
							showTooltip
							tooltipMessage="Caso não seja informada, um email será enviado ao usuário para que ele possa definir sua senha."
							tooltipPosition="right-start"
						/>
						<SysSelectField name="roles" options={context.userRoles || []} placeholder="Selecione" />
					</SysForm>
				</>
			)}
		</Styles.container>
	);
};

export default UserDetailView;
