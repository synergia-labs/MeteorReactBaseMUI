import { Store, get, set,keys,del,clear } from 'idb-keyval';
import { stringify, parse } from 'zipson';
import { ReactiveVar } from 'meteor/reactive-var';
import {ApiBase} from './base'
import { _ } from 'lodash';
import settings from '../../settings.json';




class PersistentMinimongoStorage {
    constructor(collectionName,collectionInstance) {
        var self = this;
        self.collectionName = collectionName;
        self.customStore = new Store(settings.name+'_'+collectionName, collectionName+'-store');
        self.collection = collectionInstance;

        self.inited = new ReactiveVar(false);
        self.cachedCollection = new Meteor.Collection(null);

        self.cachedCollection.insert_ = self.cachedCollection.insert;
        delete self.cachedCollection.insert;
        self.cachedCollection.insert=(doc)=>{
            const id = self.cachedCollection.insert_(doc);
            doc._id = id;
            if(self.list.indexOf(doc._id)===-1) {
                self.list.push(doc._id);
            }
            set(doc._id,stringify(doc,{detectUtcTimestamps:true}),self.customStore);
        };

        self.cachedCollection.update_ = self.cachedCollection.update;
        self.cachedCollection.update;
        self.cachedCollection.update=(selector,doc)=>{
            self.cachedCollection.update_(selector,{...doc},{upsert:true});
            const newDOc = self.cachedCollection.findOne(selector);
            set(newDOc._id,stringify(newDOc,{detectUtcTimestamps:true}),self.customStore);

        };

        self.cachedCollection.remove_ = self.cachedCollection.remove;
        self.cachedCollection.remove;
        self.cachedCollection.remove=(id)=>{
            self.cachedCollection.remove_(id);
            self.list = self.list.filter(key=>key!==id);
            del(id,self.customStore);
        }

        self.cachedCollection.clear = () => {
            if(self.list.length>0) {
                self.list.forEach(key=>{
                    del(key,self.customStore).then(result=>{
                        self.cachedCollection.remove_(key);
                    })
                })
            }
            self.list=[];
        }

        self.stats = { added: 0, removed: 0, changed: 0 };
        self.list = []
        self.updateKeys();
        // Meteor.startup(function () {

        self.initObserver();


    }


    initObserver = () => {

        if(!Meteor.isClient) {
            return;
        }

        const self = this;

        if(self.collection) {
            self.collection.find({}).observe({
                added: function (doc) {
                    // add document id to tracking list and store
                    if (!_.includes(self.list, doc._id)) {
                        self.list.push(doc._id);
                        set(doc._id,stringify(doc,{detectUtcTimestamps:true}),self.customStore);
                    }

                    self.cachedCollection.upsert({_id:doc._id},
                        {$set:doc},{upsert:true});
                    console.log(self.collectionName,'Add',doc)
                    ++self.stats.added;
                },

                removed: function (doc,...params) {
                    console.log(doc,'>',params)
                    // if not in list, nothing to do
                    // if(!_.includes(self.list, doc._id)) {
                    //     return;
                    // }
                    // del(doc._id,self.customStore);
                    // self.list = self.list.filter(key=>key!==doc._id);
                    // self.cachedCollection.remove({_id:doc._id});
                    // console.log(self.collectionName,'Remove',doc)
                    // ++self.stats.removed;
                },

                changed: function (newDoc, oldDoc) {
                    if(!_.isEqual(newDoc, oldDoc)) {
                        // update document in local storage
                        if (_.includes(self.list, newDoc._id)) {
                            set(newDoc._id,stringify(newDoc,{detectUtcTimestamps:true}),self.customStore);
                        } else {
                            self.list.push(newDoc._id);
                            set(doc._id,stringify(doc,{detectUtcTimestamps:true}),self.customStore);
                        }
                        console.log(self.collectionName,'Update',doc)
                        self.cachedCollection.update({_id:doc._id},
                            {$set:doc},{upsert:true});
                        ++self.stats.changed;
                    }

                }
            });
        }
    }

    updateDateOnJson = (object) => {
        function reviver(key, value) {
            if (Date.parse(value)) {
                return new Date(value);
            }
            return value;
        }
        return JSON.parse(JSON.stringify(object),reviver);

    }

    initCachedMinimongo = (callback) => {
        const self = this;

        var seconds = self.lastCallInit?(((new Date()).getTime()-self.lastCallInit.getTime()) / 1000):61;

        if((seconds>60)&&(!!callback||!this.inited.get())) {

            this.updateKeys((e,r)=>{
                if(!!r) {
                    self.cachedCollection.remove_({});
                    self.list.forEach(async (key,i)=>{
                        const res = await get(key,self.customStore).then(result=>{
                            const docR = parse(result);
                            const doc = self.updateDateOnJson(docR);
                            self.cachedCollection.update_({_id:doc._id},
                                {$set:doc},{upsert:true});
                        })
                    });
                    self.inited.set(true);
                    if(callback) {
                        callback(null,true);
                    }

                } else {
                    if(callback) {
                        callback(e,null)
                    }

                    console.log('Error:',self.collectionName,':',e);
                }
            })
        }

        self.lastCallInit = new Date();
        return this.inited;
    }

    updateKeys = (callback=(e)=>{
        if(e){
            // console.log('Erro:',this.collectionName,':',e)
        }}) => {
        const self = this;
        keys(self.customStore).then(keys => {
            self.list=keys
            callback(null,true);
        }).catch(err=>callback(err,null));
    }



};

export class OfflineBaseApi extends ApiBase {

    constructor(apiName, apiSch, options) {
        super(apiName,apiSch,options);
        this.subscribe = this.subscribe.bind(this);
        this.findOne = this.findOne.bind(this);
        this.find = this.find.bind(this);

        if(Meteor.isClient) {
            //Init chached collection
            this.minimongoStorage = new PersistentMinimongoStorage(apiName,this.collectionInstance);
            this.persistentCollectionInstance = this.minimongoStorage.cachedCollection;
        }


    }


    /**
     * Wrapper to find items on an collection.
     * This guarantees the the action will be executed
     * by a Meteor Mongo Collection of this framework.
     * @param  {Object} query - Params to query a document.
     * @param  {Object} projection - Params to define which fiedls will return.
     */
    find(query, projection) {
        if(Meteor.isClient) {
            return this.persistentCollectionInstance.find(query, projection);
        } else {
            return super.find(query, projection)
        }


    }

    /**
     * Wrapper to findOne items on an collection.
     * This guarantees the the action will be executed
     * by a Meteor Mongo Collection of this framework.
     * @param  {Object} query - Params to query a document.
     * @param  {Object} projection - Params to define which fiedls will return.
     */
    findOne(query={}, projection={}) {
        if(Meteor.isClient) {
            return this.persistentCollectionInstance.findOne(query, projection);
        } else {
            return super.findOne(query, projection)
        }
    }

    /**
     * Make a subscribe for a collection.
     * @param  {} api='default'
     * @param  {} ...param
     */
    subscribe (api = 'default', ...param) {
        const self = this;
        if (Meteor.isClient) {
            if (Meteor.status().status === 'connected') {

                return Meteor.subscribe(
                    `${this.collectionName}.${api}`,
                    ...param
                );
            } else {
                return {
                    ready: ()=>self.minimongoStorage.initCachedMinimongo().get(),
                };
            }
        }
        return null;
    };

}