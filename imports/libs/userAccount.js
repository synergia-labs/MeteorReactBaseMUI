import { useTracker } from 'meteor/react-meteor-data'
import {userprofileApi} from "../userprofile/api/UserProfileApi";
import {Meteor} from "meteor/meteor";

export const useAccount = () => useTracker(() => {
    const meteorUser = Meteor.user()
    const userId = Meteor.userId();

    const subHandle = userprofileApi.subscribe('getLoggedUserProfile');

    const user = subHandle.ready()&&meteorUser?(userprofileApi.findOne({email:meteorUser?meteorUser.profile.email:null})):(null)

    console.log(userId,'>>',user)

    return {
        user,
        userId,
        loading:!subHandle.ready(),
        isLoggedIn: !!userId
    }
}, [])