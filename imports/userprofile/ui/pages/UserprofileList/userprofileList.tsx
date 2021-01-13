import React from 'react';
import {withTracker} from "meteor/react-meteor-data";
import {userprofileApi} from "../../../api/UserProfileApi";
import SimpleTable from "../../../../ui/components/SimpleTable/SimpleTable";
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import * as appStyles from "/imports/materialui/styles";

const UserProfileList = ({users,history}) => {

    const onClick = (event,id,doc) => {
        history.push('/userprofile/view/'+id);
    }

    return (
        <Container>
            <Typography style={appStyles.title}>{'Lista de Usuários'}</Typography>
            <SimpleTable
                schema={_.pick(userprofileApi.schema,['photo','username','email'])}
                data={users}
                onClick={onClick}
            />
        </Container>
    );
}

export const UserProfileListContainer = withTracker((props) => {
    const subHandle = userprofileApi.subscribe('default',{});
    const users = subHandle.ready()?userprofileApi.find({}).fetch():[]

    return ({
        users,
    })
})(UserProfileList)
