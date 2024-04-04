import React from 'react';
import _ from 'lodash';
import { InputAdornment, TextField, Typography } from '@mui/material';
import { UserProfileListControllerContext } from './userProfileListController';
import { SysCardUser } from '/imports/ui/components/sysCardUser/sysCardUser';
import UserProfileListViewStyled from './userProfileListStyles';
import AddIcon from '@mui/icons-material/Add';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import SearchIcon from '@mui/icons-material/Search';
import { sysAction } from '/imports/ui/materialui/styles';

const UserProfileLisView = () => {
    const context = React.useContext(UserProfileListControllerContext);
    const { list, onAddButtonClick, onSearch, onSetFilter } = context;
    const [selectedRole, setSelectedRole] = React.useState('');
    const options = [
        {
            value: '',
            label: 'Nenhum'
        },
        {
            value: 'Administrador',
            label: 'Admnistrador',
        },
        {
            value: 'Usuario',
            label: 'Usuário',
        },
    ];

    return (
        <UserProfileListViewStyled.Container>
            <Typography variant="h5">Lista de usuários</Typography>
            <UserProfileListViewStyled.Filters>
                <TextField
                    name="userSearch"
                    placeholder='Pesquisar por nome'
                    onChange={(e) => onSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: sysAction.primaryIcon }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <SysSelectField
                    name='roles'
                    label='Filtrar por perfil'
                    placeholder='Selecionar'
                    value={selectedRole}
                    onChange={(e) => {
                        setSelectedRole(e.target.value);
                        onSetFilter('roles', e.target.value)
                    }}
                    defaultValue={selectedRole}
                    options={options}
                />
            </UserProfileListViewStyled.Filters>
            {list && list?.map(user => {
                return (
                    <SysCardUser
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
                startIcon={<AddIcon />}
                fixed={true}
                onClick={onAddButtonClick}
            />
        </UserProfileListViewStyled.Container>
    );
};

export default UserProfileLisView;
