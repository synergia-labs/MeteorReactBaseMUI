import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { UserProfileListControllerContext } from './userProfileListController';
import { SysCardUser } from '../../components/sysCardUser/sysCardUser';
import UserProfileListViewStyled from './userProfileListStyles';
import { SysFab } from '../../../../ui/components/sysFab/sysFab';
import { SysSelectField } from '../../../../ui/components/sysFormFields/sysSelectField/sysSelectField';
import { useTheme } from '@mui/material/styles';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';

const UserProfileLisView = () => {
	const context = useContext(UserProfileListControllerContext);
	const { list, onSearch, onSetFilter, onAddButtonClick } = context;
	const [selectedRole, setSelectedRole] = useState('');
	const theme = useTheme();
	const { Container, Filters } = UserProfileListViewStyled;
	const options = [
		{
			value: '',
			label: 'Nenhum'
		},
		{
			value: 'Administrador',
			label: 'Admnistrador'
		},
		{
			value: 'Usuario',
			label: 'Usuário'
		}
	];

	return (
		<Container>
			<Typography variant="h5">Lista de usuários</Typography>
			<Filters>
				<TextField
					name="userSearch"
					placeholder="Pesquisar por nome"
					onChange={(e) => onSearch(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SysIcon name={'search'} sx={{ color: theme.palette.sysAction?.primaryIcon }} />
							</InputAdornment>
						)
					}}
				/>
				<SysSelectField
					name="roles"
					label="Filtrar por perfil"
					placeholder="Selecionar"
					value={selectedRole}
					onChange={(e) => {
						setSelectedRole(e.target.value);
						onSetFilter('roles', e.target.value);
					}}
					options={options}
				/>
			</Filters>
			{list &&
				list?.map((user) => {
					return (
						<SysCardUser
							key={user._id}
							username={user.username}
							roles={user.roles}
							email={user.email}
							status={user.status}
							userId={user._id!}
						/>
					);
				})}
			<SysFab
				variant="extended"
				text="Adicionar"
				startIcon={<SysIcon name={'add'} />}
				fixed={true}
				onClick={onAddButtonClick}
			/>
		</Container>
	);
};

export default UserProfileLisView;
