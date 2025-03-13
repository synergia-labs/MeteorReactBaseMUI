import React, { ReactNode, useCallback } from 'react';
import AuthContext, { IAuthContext } from './authContext';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const user = useTracker(() => Meteor.user(), []);
  const handleLogout = useCallback((callBack: () => void) => Meteor.logout(() => callBack()), []);

  const contextValues: IAuthContext = {
    user: user,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;