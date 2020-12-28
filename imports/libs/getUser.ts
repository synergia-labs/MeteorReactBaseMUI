import shortid from 'shortid';
import {Meteor} from 'meteor/meteor';
import {Store, get, set, keys, del, clear} from 'idb-keyval';
import {stringify, parse} from 'zipson';

import settings from "/settings.json";


class LoggedUserStore {
    userStore = new Store(settings.name + '_' + 'loggedUser', 'LoggedUser-store');
    updateDateOnJson = (object) => {
        function reviver(key, value) {
            if ((value + '').length === 24 && !!Date.parse(value)) {
                return new Date(value);
            }
            return value;
        }

        return JSON.parse(JSON.stringify(object), reviver);

    }
    getUser = async () => {
            return await get('user', this.userStore).then(result => {
               return this.updateDateOnJson(parse(result));
            });
    }
    setUser = (userDoc) => {
        set('user', stringify(userDoc), this.userStore);
    }
}

let loggedUserCache;


export const userprofileData = {

}

/**
 * Return Logged User if exists.
 * @return {Object} Logged User
 */
export const getUser = (userDoc:object, connection: { id:string }):object => {


    if (userDoc) {
        return userDoc;
    }

    try {

        if (Meteor.isClient) {
            if(!loggedUserCache) {
                loggedUserCache = new LoggedUserStore();
            }
            if(Meteor.status().status !== 'connected') {

                const user = loggedUserCache.getUser();
                console.log('CachedUser',user);

                return user;

            } else {

                console.log('loggedUserCache.getUser()',loggedUserCache.getUser())

                if(!userprofileData.collectionInstance) {
                    console.log('UserProfile Collection not Avaliable');
                    loggedUserCache.setUser(Meteor.user());
                    return Meteor.user();
                }
                const userProfile = userprofileData.collectionInstance.findOne(
                    {email: Meteor.user().profile.email});

                if (userProfile) {
                    loggedUserCache.setUser(userProfile);
                    return userProfile;
                }
            }


        }




        const d = new Date();
        const simpleDate = `${d.getFullYear()}${d.getMonth() + 1}${d.getDay()}`;
        const id = connection && connection.id ? simpleDate + connection.id : shortid.generate();

        return ({
            id,
            _id: id,
            roles: ['Public'],
        });
    } catch (e) {
        const d = new Date();
        const simpleDate = `${d.getFullYear()}${d.getMonth() + 1}${d.getDay()}`;
        const id = connection && connection.id ? simpleDate + connection.id : shortid.generate();
        return ({
            id,
            _id: id,
            roles: ['Public'],
        });
    }
};
