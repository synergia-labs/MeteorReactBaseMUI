import React from 'react';
import Meteor from 'meteor/meteor'
import {ExampleListContainer} from "./exampleList";
import {ExampleDetailContainer} from "./exampleDetail";

export default (props:any) => {

    const validState = [ 'view', 'edit', 'create','fullView' ];

    const screenState =
        props.match && props.match.params && !!props.match.params.screenState
            ? props.match.params.screenState
            : undefined;

    const id =
        props.match && props.match.params && !!props.match.params.exampleId
            ? props.match.params.exampleId
            : Meteor.examplerId;

    const isPrintView = screenState&&screenState.indexOf('print')===0;
    const isFullView = screenState&&screenState.indexOf('full')===0;

    const newScreenState = screenState?(
        isPrintView?screenState.split('print')[1]:(
            isFullView?screenState.split('full')[1]:screenState
        )
    ):undefined;

    if (!!newScreenState && validState.indexOf(newScreenState) !== -1) {
        if ((newScreenState === 'view') && !!id) {
            return <ExampleDetailContainer {...props} screenState={newScreenState} isPrintView={isPrintView} isFullView={isFullView} id={id}/>;
        } else if (newScreenState === 'edit' && !!id) {
            return <ExampleDetailContainer {...props} screenState={newScreenState} isPrintView={isPrintView} isFullView={isFullView} id={id} edit/>;
        } else if (newScreenState === 'create') {
            return <ExampleDetailContainer DetailContainer {...props} screenState={newScreenState} isPrintView={isPrintView} isFullView={isFullView} create/>;
        }
    } else {
        return <ExampleListContainer {...props} isPrintView={isPrintView} isFullView={isFullView} />;
    }
};
