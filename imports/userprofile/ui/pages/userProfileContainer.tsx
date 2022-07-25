import React from 'react';
import { UserProfileListContainer } from './UserProfileList/userProfileList';
import { UserProfileDetailContainer } from './UserProfileDetail/userProfileDetail';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';

export default (props: IDefaultContainerProps) => {
    const validState = ['view', 'edit', 'create'];

    let { screenState, userprofileId } = useParams();

    const state = screenState ? screenState : props.screenState;

    const id = userprofileId ? userprofileId : props.user!._id;

    if (!!state && validState.indexOf(state) !== -1) {
        if (state === 'view' && !!id) {
            return <UserProfileDetailContainer {...props} screenState={state} id={id} />;
        } else if (state === 'edit' && !!id) {
            return <UserProfileDetailContainer {...props} screenState={state} id={id} edit />;
        } else if (state === 'create') {
            return <UserProfileDetailContainer {...props} screenState={state} create />;
        }
    } else {
        return <UserProfileListContainer {...props} />;
    }
};
