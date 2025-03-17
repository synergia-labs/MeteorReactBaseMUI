import React, { ReactNode, useCallback } from 'react';
import AuthContext, { IAuthContext } from './authContext';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { hasValue } from '/imports/libs/hasValue';

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const userLoggedIn = useTracker(() => !!Meteor.userId(), []);
  const user = useTracker(() => Meteor.user(), []);
  const handleLogout = useCallback((callBack: () => void) => Meteor.logout(() => callBack()), []);

  const contextValues: IAuthContext = {
    user: user,
    userLoggedIn: userLoggedIn,
    userLoading: !hasValue(user) && userLoggedIn,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;