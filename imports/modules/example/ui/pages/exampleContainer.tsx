import React from 'react';
import {ExampleListContainer} from './exampleList';
import {ExampleDetailContainer} from './exampleDetail';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';

export default (props: IDefaultContainerProps) => {

  const validState = ['view', 'edit', 'create'];

  let { screenState,exampleId } = useParams();

  const state = screenState ? screenState : props.screenState;

  const id =exampleId? exampleId: props.exampleId;

  if (!!state && validState.indexOf(state) !== -1) {
    if ((state === 'view') && !!id) {
      return <ExampleDetailContainer {...props} screenState={state}
                                      id={id}/>;
    } else if (state === 'edit' && !!id) {
      return <ExampleDetailContainer {...props} screenState={state}
                                      id={id} edit/>;
    } else if (state === 'create') {
      return <ExampleDetailContainer DetailContainer {...props}
                                     screenState={state}
                                      id={id} create/>;
    }
  } else {
    return <ExampleListContainer {...props} />;
  }
};
