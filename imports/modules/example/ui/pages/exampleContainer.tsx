import React from 'react';
import Meteor from 'meteor/meteor'
import {ExampleListContainer} from "./exampleList";
import {ExampleDetailContainer} from "./exampleDetail";

export default (props:any) => {

    const validState = [ 'view', 'edit', 'create' ];

    const screenState =
        props.match && props.match.params && !!props.match.params.screenState
            ? props.match.params.screenState
            : undefined;

    const id =
        props.match && props.match.params && !!props.match.params.exampleId
            ? props.match.params.exampleId
            : Meteor.examplerId;



    if (!!screenState && validState.indexOf(screenState) !== -1) {
        if (screenState === 'view' && !!id) {
            return <ExampleDetailContainer {...props} screenState={screenState} id={id}/>;
        } else if (screenState === 'edit' && !!id) {
            return <ExampleDetailContainer {...props} screenState={screenState} id={id} edit/>;
        } else if (screenState === 'create') {
            return <ExampleDetailContainer DetailContainer {...props} screenState={screenState} create/>;
        }
    } else {
        return <ExampleListContainer {...props} />;
    }
};
