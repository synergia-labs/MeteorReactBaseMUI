import React from 'react';
import _ from 'lodash';
import { IUserProfile } from '/imports/modules/userprofile/api/UserProfileSch';
import { NavigateFunction } from 'react-router-dom';
import {  Typography } from '@mui/material';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { UserProfileDetailViewStyledContainer } from './userProfileDetailStyles';
import AddIcon from '@mui/icons-material/Add';
import { UserProfileDetailControllerContext } from './userProfileDetailController';

interface IUserProfileList {
	users: IUserProfile[];
	navigate: NavigateFunction;
}

const UserProfileDetailView = () => {
	const userProfileListViewContext = React.useContext(UserProfileDetailControllerContext)
	return (
        <UserProfileDetailViewStyledContainer>
            {/* <SysFab 
                variant="extended" 
                text="Adicionar" 
                startIcon={<AddIcon />} 
                fixed={true}
                onClick={userProfileListViewContext.onAddButtonClick}
            /> */}
            <Typography variant="h5">Lista de usuários</Typography>
        </UserProfileDetailViewStyledContainer>
    );
};

export default UserProfileDetailView;
