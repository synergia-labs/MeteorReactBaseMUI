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
        self.cachedCollection.insert=(doc,callback=()=>{})=>{
            console.log('CC - Insert',doc);
            if(!doc||Object.keys(doc).length===0) {
                return;
            }
            try {
            doc.needSync = true;
            const id = self.cachedCollection.insert_(doc);
            doc._id = id;
            if(self.list.indexOf(doc._id)===-1) {
                self.list.push(doc._id);
            }
            set(doc._id,stringify(doc),self.customStore);
            callback(null,id);
            } catch (e) {
                callback(e,null);
            }
        };

        self.cachedCollection.update_ = self.cachedCollection.update;
        delete self.cachedCollection.update;
        self.cachedCollection.update=(selector,doc,options,callback=()=>{})=>{
            console.log('CC - update',selector,'doc>',doc,'Op>',options,'calb>>',callback);
            if(!doc||Object.keys(doc).length===0) {
                return;
            }
            try {
            doc.needSync = true;
            self.cachedCollection.update_(selector,{...doc},{...(options||{}),upsert:true});
            const newDoc = self.cachedCollection.findOne(selector);
            set(newDoc._id,stringify(newDoc),self.customStore);
            callback(null,{...selector,...newDoc})
            } catch (e) {
                console.log('Error:',e)
                callback(e,null);
            }
        };

        self.cachedCollection.remove_ = self.cachedCollection.remove;
        delete self.cachedCollection.remove;
        self.cachedCollection.remove=(doc,callback=()=>{})=>{
            console.log('CC - delete',doc);
            if(!doc||Object.keys(doc).length===0) {
                return;
            }
            try {
            self.cachedCollection.remove_(doc._id);
            if(!doc.removeOnly) {
                self.list = self.list.filter(key=>key!==doc._id);
                del(doc._id,self.customStore);
            }

            callback(null,true)
            } catch (e) {
                callback(e,null);
            }
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
                        set(doc._id,stringify(doc),self.customStore);
                    }

                    self.cachedCollection.upsert({_id:doc._id},
                        {$set:doc},{upsert:true});
                    console.log(self.collectionName,'Observer - add',doc)
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
                    self.cachedCollection.remove({_id:doc._id,removeOnly:true});
                    console.log(self.collectionName,'Observer - del',doc)
                    ++self.stats.removed;
                },

                changed: function (newDoc, oldDoc) {
                    const doc = _.merge(oldDoc,newDoc);
                        // update document in local storage
                        if (_.includes(self.list, doc._id)) {
                            set(doc._id,stringify(doc),self.customStore);
                        } else {
                            self.list.push(doc._id);
                            set(doc._id,stringify(doc),self.customStore);
                        }
                    console.log(self.collectionName,'Observer - update',doc)
                        self.cachedCollection.update({_id:doc._id},
                            {$set:doc},{upsert:true});
                        ++self.stats.changed;

                }
            });
        }
    }

    updateDateOnJson = (object) => {
        function reviver(key, value) {
            console.log(key, value)
            if ((value+'').length===24&&!!Date.parse(value)) {
                console.log('IS DATE')
                return new Date(value);
            }
            console.log('IsNotDate',(value+'').length===24,'>',!!Date.parse(value),'>',isNaN(parseInt(value)))
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
        this.callMethod = this.callMethod.bind(this);
        this.syncAll = this.syncAll.bind(this);

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
        console.log('Meteor.status()',Meteor.status())
        const self = this;
        if (Meteor.isClient) {
            if (Meteor.status().status !== 'waiting') {

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

    callOfflineMethod = (name,docObj,callback=()=>{}) => {
        console.log('Offline METHOD -',name,'>>>',docObj,'Calback>>',callback)
        if(name==='update') {
            const oldDoc = Meteor.status().connected?this.getCollectionInstance().findOne({_id:docObj._id})
                :this.persistentCollectionInstance.findOne({_id:docObj._id})
            this.persistentCollectionInstance[name]({_id:docObj._id},{...(oldDoc||{}),...docObj},{},callback);
        } else {
            this.persistentCollectionInstance[name](docObj,callback);
        }

    }

    /**
     * Wrapper to the Meteor call. This check if the user has
     * connection with the server, in this way we can return the result from
     * a cached collection or from the server.
     * @param  {String} name - Meteor method name defin
     * @param  {Object} ...params - Parameters for this meteor method.
     */
    callMethod(name, ...params) {
        const self = this;

        if (Meteor.status().connected) {
            // if(name==='insert'||name==='update'||name==='remove') {
            //     Meteor.call(`${this.collectionName}.${name}`, params[0],(e,r)=>{
            //
            //         if(!e) {
            //             self.callOfflineMethod(name,params[0]);
            //         }
            //
            //
            //         if(!!params[1] && typeof params[1] === 'function' ) {
            //             params[1](e,r);
            //         }
            //     });
            // } else {
                Meteor.call(`${this.collectionName}.${name}`, ...params);
            // }

        } else if(Meteor.status().status === 'waiting'){
            if(name==='insert'||name==='update'||name==='remove') {

                self.callOfflineMethod(name,...params);


            } else {
                console.log('Sem Conexão com o Servidor');
            }

            //window.$app.globalFunctions.openSnackBar('SEM CONEXÃO COM O SERVIDOR:Sua operçaão não será registrada. Verifique sua conexão com a internet.', 'info');
        }

    }


    /**
     * Sync one object.
     * @param  {Object} docObj - Document from a collection.
     * @param  {Function} callback - Callback Function
     */
    syncAll(docObj, callback=()=>{},processCalback = () => {}) {
        //this.callMethod('sync', docObj, callback);

        //Sync all changed docs

    }


}