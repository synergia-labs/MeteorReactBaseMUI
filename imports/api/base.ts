import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { IDoc } from "../typings/IDoc";
import { ISchema } from "../typings/ISchema";
import { IBaseOptions } from "/imports/typings/IBaseOptions";

const Counts = new Mongo.Collection("counts");
Counts.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

const defaultOptions = {
  disableDefaultPublications: true,
};

type IPublication = {
  [key: string]: any;
};

// region Base Model
export class ApiBase<Doc extends IDoc> {
  noImagePath?: string;
  publications: IPublication;
  restApi = {};
  schema: ISchema<Doc>;
  collectionName: string | null;
  // @ts-ignore
  collectionInstance: Mongo.Collection<any>;
  counts: Mongo.Collection<any>;
  options: IBaseOptions;

  /**
   * Constructor
   * @param apiName
   * @param apiSch
   * @param  {Object} options
   */
  constructor(
    apiName: string,
    apiSch: ISchema<Doc>,
    options?: IBaseOptions | undefined
  ) {
    this.options = {
      ...defaultOptions,
      ...(options || {}),
    };
    this.noImagePath = this.options.noImagePath;
    this.collectionName = apiName;
    this.schema = apiSch;
    this.counts = Counts;
    this.publications = {};

    this.initCollection(apiName);
    this.initCollection = this.initCollection.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.findOne = this.findOne.bind(this);
    this.find = this.find.bind(this);
    this.sync = this.sync.bind(this);
    this.countDocuments = this.countDocuments.bind(this);
    this.callMethod = this.callMethod.bind(this);

    // Put model on Window variable
    if (window) {
      // @ts-ignore
      if (!window.$app) {
        // @ts-ignore
        window.$app = {};
      }
      // @ts-ignore
      if (!window.$app.api) {
        // @ts-ignore
        window.$app.api = {};
      }

      // @ts-ignore
      window.$app.api[this.collectionName] = this;
    }
    // ####################################
  }

  getSchema = () => {
    return { ...this.schema };
  };

  addImgPathToFields = (doc: any) => {
    Object.keys(this.schema).forEach((field) => {
      if (this.schema[field].isImage) {
        if (doc["has" + field]) {
          doc[field] = `${Meteor.absoluteUrl()}thumbnail/${
            this.collectionName
          }/${field}/${doc._id}?date=${
            doc.lastupdate && doc.lastupdate.toISOString
              ? doc.lastupdate.toISOString()
              : "1"
          }`;
        } else {
          doc[field] = this.noImagePath
            ? this.noImagePath
            : `${Meteor.absoluteUrl()}images/noimage.jpg`;
        }
      }
    });
    return doc;
  };

  initCollection(apiName: string) {
    const self = this;
    this.collectionName = apiName;
    if (this.collectionName !== "users") {
      this.collectionInstance = new Mongo.Collection(this.collectionName, {
        transform: (doc) => {
          // for get path of image fields.
          return self.addImgPathToFields(doc);
        },
      });
      // Deny all client-side updates on the Lists collection
      this.getCollectionInstance().deny({
        insert() {
          return true;
        },
        update() {
          return true;
        },
        remove() {
          return true;
        },
      });
    } else {
      this.collectionInstance = Meteor.users;
      // Deny all client-side updates on the Lists collection
      this.getCollectionInstance().deny({
        insert() {
          return true;
        },
        update() {
          return true;
        },
        remove() {
          return true;
        },
      });
    }
  }

  /**
   * Get the collection instance.
   * @returns {Object} - Collection.
   */
  getCollectionInstance() {
    return this.collectionInstance;
  }

  /**
   * @returns {String} - Return the number of documents from a collection.
   */
  countDocuments() {
    return this.getCollectionInstance().find().count();
  }

  /**
   * Wrapper to the Meteor call. This check if the user has
   * connection with the server, in this way we can return the result from
   * a cached collection or from the server.
   * @param  {String} name - Meteor method name
   * @param params
   */
  callMethod(name: string, ...params: any[]) {
    if (Meteor.status().connected) {
      Meteor.call(`${this.collectionName}.${name}`, ...params);
    } else {
      console.log("Sem Conexão com o Servidor");
    }
  }

  /**
   * Wrapper for a Meteor call.
   * @param  {Object} docObj - Document from a collection.
   * @param  {Function} callback - Callback Function
   */
  import(
    docObj: Doc | Partial<Doc>,
    callback = (e: Error, r: any) => {
      console.log(e, r);
    }
  ) {
    this.callMethod("import", docObj, callback);
  }

  /**
   * Wrapper for a Meteor call.
   * @param  {Object} docObj - Document from a collection.
   * @param  {Function} callback - Callback Function
   */
  insert(docObj: any, callback: any) {
    const newObj: { [key: string]: any } = { _id: docObj._id };
    const schema = this.getSchema();
    Object.keys(docObj).forEach((key) => {
      if (
        !!schema[key] &&
        ((!schema[key].isImage && !schema[key].isAvatar) ||
          (docObj[key].indexOf("/img/") === -1 &&
            docObj[key].indexOf("/thumbnail/") === -1))
      ) {
        newObj[key] = docObj[key];
      }
    });
    this.callMethod("insert", newObj, callback);
  }

  /**
   * Wrapper for a Meteor call.
   * @param  {Object} docObj - Document from a collection.
   * @param  {Function} callback - Callback Function
   */
  update(
    docObj: any,
    callback = (e: Error, r: any) => {
      console.log(e, r);
    }
  ) {
    const newObj: { [key: string]: any } = { _id: docObj._id };
    const schema = this.schema;
    Object.keys(docObj).forEach((key) => {
      if (
        !!schema[key] &&
        ((!schema[key].isImage && !schema[key].isAvatar) ||
          (typeof docObj[key] === "string" &&
            docObj[key].indexOf("/img/") === -1 &&
            docObj[key].indexOf("/thumbnail/") === -1))
      ) {
        newObj[key] = docObj[key];
      }
    });

    return this.callMethod("update", newObj, callback);
  }

  /**
   * Wrapper for a Meteor call.
   * @param  {Object} docObj - Document from a collection.
   * @param  {Function} callback - Callback Function
   */
  upsert(docObj: Doc | Partial<Doc>, callback: any) {
    if (!docObj._id) {
      return this.insert(docObj, callback);
    }
    return this.update(docObj, callback);
  }

  /**
   * Wrapper for a Meteor call.
   * @param  {Object} docObj - Document from a collection.
   * @param  {Function} callback - Callback Function
   */
  remove(
    docObj: object,
    callback = (e: Error, r: any) => {
      console.log(e, r);
    }
  ) {
    this.callMethod("remove", docObj, callback);
  }

  /**
   * Get Docs
   * @param apiName
   * @param filter
   * @param optionsPub
   * @param  {Function} callback - Callback Function
   */
  getDocs(
    apiName = "default",
    filter = {},
    optionsPub = {},
    callback = (e: Error, r: any) => {
      console.log(e, r);
    }
  ) {
    this.callMethod("getDocs", apiName, filter, optionsPub, callback);
  }

  /**
   * Sync one object.
   * @param  {Object} docObj - Document from a collection.
   * @param  {Function} callback - Callback Function
   */
  sync(
    docObj: Doc | Partial<Doc>,
    callback = (e: Error, r: any) => {
      console.log(e, r);
    }
  ) {
    this.callMethod("sync", docObj, callback);
  }

  /**
   * Wrapper to find items on an collection.
   * This guarantees the the action will be executed
   * by a Meteor Mongo Collection of this framework.
   * @param  {Object} query - Params to query a document.
   * @param  {Object} projection - Params to define which fields will return.
   */
  find(query: object = {}, projection: object = {}) {
    return this.getCollectionInstance().find(query, projection);
  }

  /**
   * Wrapper to findOne items on an collection.
   * This guarantees the the action will be executed
   * by a Meteor Mongo Collection of this framework.
   * @param  {Object} query - Params to query a document.
   * @param  {Object} projection - Params to define which fields will return.
   */
  findOne(query: object = {}, projection: object = {}) {
    return this.getCollectionInstance().findOne(query, projection);
  }

  /**
   * Make a subscribe for a collection.
   * @param  {} api='default'
   * @param param
   */
  subscribe(
    api = "default",
    ...param: any[]
  ): {
    total: number;
    stop(): void;
    ready: () => boolean;
  } | null {
    const self = this;
    if (Meteor.isClient) {
      const subsHandle = Meteor.subscribe(
        `${this.collectionName}.${api}`,
        ...param
      );

      const subHandleCounter = Meteor.subscribe(
        `${this.collectionName}.count${api}`,
        param[0] || {}
      );
      const countResult = subHandleCounter.ready()
        ? self.counts.findOne({ _id: api + "Total" })
        : null;
      const count = countResult ? countResult.count : 0;

      if (subHandleCounter && subHandleCounter.ready) {
        return {
          ...subsHandle,
          total: subHandleCounter.ready() ? count : 0,
          ready: () => subsHandle.ready() && subHandleCounter.ready(),
        };
      }

      return { ...subsHandle, total: 0 };
    }
    return null;
  }
}
