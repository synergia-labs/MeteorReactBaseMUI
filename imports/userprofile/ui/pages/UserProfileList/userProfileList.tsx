import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {userprofileApi} from '../../../api/UserProfileApi';
import SimpleTable from '/imports/ui/components/SimpleTable/SimpleTable';
import _ from 'lodash';
import {PageLayout} from '/imports/ui/layouts/pageLayout';

const UserProfileList = ({users, history}) => {

  const onClick = (event, id, doc) => {
    history.push('/userprofile/view/' + id);
  };

  return (
      <PageLayout
          title={'Lista de Usuários'}
          actions={[]}
      >
        <SimpleTable
            schema={_.pick(userprofileApi.schema,
                ['photo', 'username', 'email'])}
            data={users}
            onClick={onClick}
        />
      </PageLayout>
  );
};

export const UserProfileListContainer = withTracker((props) => {
  const subHandle = userprofileApi.subscribe('default', {});
  const users = subHandle.ready() ? userprofileApi.find({}).fetch() : [];

  return ({
    users,
  });
})(UserProfileList);
