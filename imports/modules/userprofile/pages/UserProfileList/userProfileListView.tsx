import React from 'react';
import _ from 'lodash';
import { IUserProfile } from '/imports/modules/userprofile/api/UserProfileSch';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {  Typography } from '@mui/material';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { UserProfileListViewStyledContainer } from './userProfileListStyles';
import { UserProfileListControllerContext } from './userProfileListController';
import AddIcon from '@mui/icons-material/Add';
import { ComplexTable } from '/imports/ui/components/ComplexTable/ComplexTable';

interface IUserProfileList {
	users: IUserProfile[];
	navigate: NavigateFunction;
}

const UserProfileLisViewt = () => {
	const userProfileListViewContext = React.useContext(UserProfileListControllerContext);
    const navigate = useNavigate();
    
	return (
        <UserProfileListViewStyledContainer>
            <SysFab 
                variant="extended" 
                text="Adicionar" 
                startIcon={<AddIcon />} 
                fixed={true}
                onClick={userProfileListViewContext.onAddButtonClick}
            />
            <Typography variant="h5">Lista de usuários</Typography>
            <ComplexTable
					data={userProfileListViewContext.usuarios}
					schema={userProfileListViewContext.schema}
					onRowClick={(row) => navigate('/userprofile/view/' + row.id)}
					searchPlaceholder={'Pesquisar usuário'}
                    onEdit={(row) => navigate('/userprofile/edit/' + row._id)}
                    onDelete={() => {}}
					
				/>
        </UserProfileListViewStyledContainer>
    );
};

export default UserProfileLisViewt;
