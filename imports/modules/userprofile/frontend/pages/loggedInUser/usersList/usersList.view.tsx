import React, { useContext, useEffect } from "react";
import Styles from "./usersList.styles";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import { SysSelectField } from "/imports/ui/components/sysFormFields/sysSelectField/sysSelectField";
import Context, { IUsersListContext } from "./usersList.context";
import CardUser from "../../../components/userCard/userCard.view";
import { SysFab } from "/imports/ui/components/sysFab/sysFab";

const UserListView: React.FC = () => {
	const { userList, userRoles, openDetail } = useContext<IUsersListContext>(Context);

	useEffect(() => openDetail(), []);

	return (
		<Styles.container>
			<Typography variant="h5">Lista de usuários</Typography>
			<Styles.filters>
				<TextField
					name="userSearch"
					placeholder="Pesquisar por nome"
					InputProps={{
						startAdornment: (
							<SysIcon
								name={"search"}
								sx={{
									color: (theme) => theme.palette.sysAction?.primaryIcon
								}}
							/>
						)
					}}
				/>
				<SysSelectField name="roles" label="Filtrar por perfil" placeholder="Selecionar" options={userRoles} />
			</Styles.filters>
			<Styles.listContainer>
				{userList.map((user) => (
					<CardUser key={user._id} {...user} />
				))}
			</Styles.listContainer>

			<SysFab
				variant="extended"
				text="Adicionar"
				startIcon={<SysIcon name={"add"} />}
				fixed={true}
				onClick={() => openDetail()}
			/>
		</Styles.container>
	);
};

export default UserListView;
