import React from 'react';
import {ExampleListContainer} from './exampleList';
import {ExampleDetailContainer} from './exampleDetail';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';

export default (props: IDefaultContainerProps) => {

  const validState = ['view', 'edit', 'create'];

  const screenState =
      props.match && props.match.params && !!props.match.params.screenState
          ? props.match.params.screenState
          : props.screenState;

  const id =
      props.match && props.match.params && !!props.match.params.exampleId
          ? props.match.params.exampleId
          : props.id;

  if (!!screenState && validState.indexOf(screenState) !== -1) {
    if ((screenState === 'view') && !!id) {
      return <ExampleDetailContainer {...props} screenState={screenState}
                                      id={id}/>;
    } else if (screenState === 'edit' && !!id) {
      return <ExampleDetailContainer {...props} screenState={screenState}
                                      id={id} edit/>;
    } else if (screenState === 'create' && !!id) {
      return <ExampleDetailContainer DetailContainer {...props}
                                     screenState={screenState}
                                      id={id} create/>;
    }
  } else {
    return <ExampleListContainer {...props} />;
  }
};
