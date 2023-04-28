import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { userprofileApi } from '../../../api/UserProfileApi';
import { SimpleTable } from '/imports/ui/components/SimpleTable/SimpleTable';
import _ from 'lodash';
import { PageLayout } from '../../../../ui/layouts/PageLayout';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import { NavigateFunction } from 'react-router-dom';

interface IUserProfileList {
	users: IUserProfile[];
	navigate: NavigateFunction;
}

const UserProfileList = ({ users, navigate }: IUserProfileList) => {
	const onClick = (event, id, doc) => {
		navigate('/userprofile/view/' + id);
	};

	return (
		<PageLayout title={'Lista de Usuários'} actions={[]}>
			<SimpleTable
				schema={_.pick(userprofileApi.schema, ['photo', 'username', 'email'])}
				data={users}
				onClick={onClick}
			/>
		</PageLayout>
	);
};

export const UserProfileListContainer = withTracker((props) => {
	const subHandle = userprofileApi.subscribe('userProfileList', {});
	const users = subHandle.ready() ? userprofileApi.find({}).fetch() : [];

	return {
		users
	};
})(UserProfileList);
