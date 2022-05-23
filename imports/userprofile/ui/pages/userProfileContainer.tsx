import React from 'react';
import {UserProfileListContainer} from './UserProfileList/userProfileList';
import {UserProfileDetailContainer} from './UserProfileDetail/userProfileDetail';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { Meteor } from 'meteor/meteor';

export default (props: IDefaultContainerProps) => {

  const validState = ['view', 'edit', 'create'];

  const screenState =
      props.match && props.match.params && !!props.match.params.screenState
          ? props.match.params.screenState
          : undefined;

  const id =
      props.match && props.match.params && !!props.match.params.userprofileId
          ? props.match.params.userprofileId
          : Meteor.userId;

  if (!!screenState && validState.indexOf(screenState) !== -1) {
    if (screenState === 'view' && !!id) {
      return <UserProfileDetailContainer {...props} screenState={screenState}
                                         id={id}/>;
    } else if (screenState === 'edit' && !!id) {
      return <UserProfileDetailContainer {...props} screenState={screenState}
                                         id={id} edit/>;
    } else if (screenState === 'create') {
      return <UserProfileDetailContainer {...props} screenState={screenState}
                                         create/>;
    }
  } else {
    return <UserProfileListContainer {...props} />;
  }
};
