import React from 'react';
import _ from 'lodash';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import { NavigateFunction } from 'react-router-dom';
import {  Typography } from '@mui/material';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { UserProfileListViewStyledContainer } from './userProfileListStyles';
import { UserProfileListControllerContext } from './userProfileListController';
import AddIcon from '@mui/icons-material/Add';

interface IUserProfileList {
	users: IUserProfile[];
	navigate: NavigateFunction;
}

const UserProfileLisViewt = () => {
	const userProfileListViewContext = React.useContext(UserProfileListControllerContext)
	return (
        <UserProfileListViewStyledContainer>
            {/* <SysFab 
                variant="extended" 
                text="Adicionar" 
                startIcon={<AddIcon />} 
                fixed={true}
                onClick={userProfileListViewContext.onAddButtonClick}
            /> */}
            <Typography variant="h5">Lista de usuários</Typography>
        </UserProfileListViewStyledContainer>
    );
};

export default UserProfileLisViewt;
