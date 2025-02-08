import React, { ReactNode, useCallback } from 'react';
import AuthContext, { IAuthContext } from './authContext';
import settings from '../../../settings.json';
import { createStore, del, get, set } from 'idb-keyval';
import { useTracker } from 'meteor/react-meteor-data';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';
import { userprofileApi } from '/imports/modules/userprofile/api/userProfileApi';
import { hasValue } from '/imports/libs/hasValue';
import { parse, stringify } from 'zipson';
import { IMeteorError } from '/imports/typings/IMeteorError';

const accountStore = createStore(`${settings.name}_UserAccount`, 'store');
const cachedUser = new ReactiveVar(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const { user, userLoading, isLoggedIn } = useTracker(() => {
    const isConnected = Meteor.status().connected;

    if (!isConnected) return { userLoading: true };

    let meteorUser = Meteor.user();
    let userId = Meteor.userId();

    const getStoredUser = () =>
      get('userId', accountStore).then((result) => cachedUser.set(result ? parse(result) : null));

    if (hasValue(userId)) {
      set('userId', stringify(meteorUser), accountStore);
    } else if (Meteor.status().status === 'waiting') {
      meteorUser = cachedUser.get() as Meteor.User | null;
      userId = meteorUser?._id || null;
      !userId && getStoredUser();
    } else {
      del('userId', accountStore);
    }

    const subHandle = userprofileApi.subscribe('getLoggedUserProfile');

    const user: IUserProfile | undefined =
      (subHandle?.ready() && meteorUser)
        ? userprofileApi.findOne({ email: (meteorUser?.profile as any).email })
        : null;

    return {
      user,
      userLoading: hasValue(meteorUser) && !hasValue(user),
      isLoggedIn: !!meteorUser,
    };
  }, []);

  const handleLogout = useCallback((callBack: () => void) => {
    Meteor.logout(() => {
      cachedUser.set(null);
      del('userId', accountStore);
      callBack();
    });
  }, [cachedUser, accountStore]);

  const handleSignIn = useCallback((
    email: string,
    password: string,
    callBack: (error: IMeteorError) => void
  ) => {
    Meteor.loginWithPassword(email, password, (error) => callBack(error as IMeteorError));
  }, []);


  const contextValues: IAuthContext = {
    user: user,
    userLoading: userLoading,
    isLoggedIn: isLoggedIn || false,
    logout: handleLogout,
    signIn: handleSignIn
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;