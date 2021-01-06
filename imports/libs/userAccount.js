import { useTracker } from 'meteor/react-meteor-data'
import {userprofileApi} from "../userprofile/api/UserProfileApi";
import {Meteor} from "meteor/meteor";
import {Store, get, set, del} from 'idb-keyval';
import {stringify, parse} from 'zipson';
import settings from "/settings.json";
import {ReactiveVar} from 'meteor/reactive-var';

const accountStore = new Store(settings.name + '_UserAccount' , 'store');
const cachedUser = new ReactiveVar(null);

export const cleanUserCache = () =>del('userId', accountStore);

export const useAccount = () => useTracker(() => {
    let meteorUser = Meteor.user()
    let userId = Meteor.userId();

    const getStoredUser = () => {
        get('userId', accountStore).then(result => {
            cachedUser.set(result?parse(result):null);
        })
    }

    if(!!userId) {
        set('userId', stringify(meteorUser), accountStore);

    } else if(Meteor.status().status === 'waiting') {
        meteorUser = cachedUser.get();
        userId = meteorUser?meteorUser._id:undefined;
        !userId&&getStoredUser();
    } else {
          del('userId', accountStore);
    }

    const subHandle = userprofileApi.subscribe('getLoggedUserProfile');

    const user = subHandle.ready()&&meteorUser?(userprofileApi.findOne({email:meteorUser?meteorUser.profile.email:null})):(null)

    return {
        user,
        userId,
        userLoading:!subHandle.ready(),
        isLoggedIn: !!userId
    }
}, [])