import React, { ReactNode, useCallback, useEffect, useState } from "react";
import AuthContext, { IAuthContext } from "./authContext";
import { useTracker } from "meteor/react-meteor-data";
import { hasValue } from "/imports/libs/hasValue";
import { Meteor } from "meteor/meteor";
import usersApi from "/imports/modules/users/frontend/api";

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [userPhoto, setUserPhoto] = useState<string | undefined>(undefined);
	const userId = useTracker(() => Meteor.userId(), []);
	const user = useTracker(() => Meteor.user(), []);
	const handleLogout = useCallback((callBack: () => void) => Meteor.logout(() => callBack()), []);

	useEffect(() => {
		if (!user?.profile?.photo) return;
		if (!userId) return;
		usersApi.getUserPhoto({ _id: userId }, (error, result) => {
			if (error) return;
			setUserPhoto(result);
		});
	}, [user?.profile?.photo]);

	const returnUser: Meteor.User | null = !!user
		? {
				...(user as Meteor.User),
				profile: {
					...(user?.profile as Meteor.UserProfile),
					photo: userPhoto
				}
			}
		: null;

	const contextValues: IAuthContext = {
		user: returnUser,
		userLoggedIn: !!userId,
		userLoading: !hasValue(user) && !!userId,
		logout: handleLogout
	};

	return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
