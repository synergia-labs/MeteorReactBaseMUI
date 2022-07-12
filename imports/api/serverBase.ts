import { noAvatarBase64, noImageBase64 } from "./noimage";
import { isArray, isObject, merge } from "lodash";
import { hasValue } from "../libs/hasValue";
import { getUser } from "/imports/libs/getUser";
import { Mongo } from "meteor/mongo";
import { Meteor, Subscription } from "meteor/meteor";
import { check } from "meteor/check";
import { IDoc } from "../typings/IDoc";
import { ISchema } from "../typings/ISchema";
import { IContext } from "../typings/IContext";
import sharp from "sharp";
import { IBaseOptions } from "/imports/typings/IBaseOptions";

// Conters
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

const getNoImage = (isAvatar = false) => {
  if (!isAvatar) {
    return noImageBase64;
  } else {
    return noAvatarBase64;
  }
};

const defaultOptions = {
  disableDefaultPublications: false,
};

interface IMongoOptions<T> extends Mongo.Options<T> {
  projection: any;
}

interface IApiRestImage {
  addRoute: (path: string, handle: any) => void;
  addThumbnailRoute: (path: string, handle: any) => void;
}

type IPublication = {
  [key: string]: any;
};

type IResponse = {
  [key: string]: any;
};

// region Base Model
export class ServerApiBase<Doc extends IDoc> {
  noImagePath?: string;
  publications: IPublication;
  restApi = {};
  schema: ISchema<Doc>;
  collectionName: string | null;
  // @ts-ignore
  collectionInstance: Mongo.Collection<any>;
  counts: Mongo.Collection<any>;
  apiRestImage?: IApiRestImage | undefined;

  /**
   * Constructor
   * @param apiName
   * @param apiSch
   * @param  {Object} options
   */
  constructor(apiName: string, apiSch: ISchema<Doc>, options?: IBaseOptions) {
    options = { ...defaultOptions, ...options };
    this.noImagePath = options?.noImagePath;
    this.collectionName = apiName;
    this.schema = apiSch;

    this.initCollection(apiName);
    this.initApiRest();
    this.publications = {};

    this.counts = Counts;

    this.initCollection = this.initCollection.bind(this);
    this.getSchema = this.getSchema.bind(this);
    this.findOne = this.findOne.bind(this);
    this.find = this.find.bind(this);
    this.getCollectionInstance = this.getCollectionInstance.bind(this);

    this.addPublication = this.addPublication.bind(this);
    this.addTransformedPublication = this.addTransformedPublication.bind(this);
    this.registerAllMethods = this.registerAllMethods.bind(this);
    this.serverUpdate = this.serverUpdate.bind(this);
    this.serverInsert = this.serverInsert.bind(this);
    this.serverRemove = this.serverRemove.bind(this);
    this.serverUpsert = this.serverUpsert.bind(this);
    this.serverGetDocs = this.serverGetDocs.bind(this);

    this.afterInsert = this.afterInsert.bind(this);
    this.beforeUpdate = this.beforeUpdate.bind(this);
    this.beforeRemove = this.beforeRemove.bind(this);
    this.createAPIRESTForIMGFields = this.createAPIRESTForIMGFields.bind(this);
    this.createAPIRESTThumbnailForIMGFields =
      this.createAPIRESTThumbnailForIMGFields.bind(this);

    this.countDocuments = this.countDocuments.bind(this);
    this.defaultCollectionPublication =
      this.defaultCollectionPublication.bind(this);

    this.registerPublications(options);
    this.registerAllMethods();
    this.includeAuditData = this.includeAuditData.bind(this);

    this.createAPIRESTForIMGFields();

    this.createAPIRESTThumbnailForIMGFields(sharp);
  }

  getSchema = () => {
    return { ...this.schema };
  };

  initCollection(apiName: string) {
    this.collectionName = apiName;
    if (this.collectionName !== "users") {
      // If Is SERVER
      this.collectionInstance = new Mongo.Collection(this.collectionName);
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

  initApiRest = () => {
    if (Meteor.isServer) {
      // @ts-ignore
      import { WebApp } from "meteor/webapp";
      // @ts-ignore
      import connectRoute from "connect-route";

      this.apiRestImage = {
        addRoute: (path: string, handle: any) => {
          console.log("Path", path);
          WebApp.connectHandlers.use(
            connectRoute((router: any) => {
              router.get("/img/" + path, handle);
            })
          );
        },
        addThumbnailRoute: (path: string, handle: any) => {
          console.log("Path", path);
          WebApp.connectHandlers.use(
            connectRoute((router: any) => {
              router.get("/thumbnail/" + path, handle);
            })
          );
        },
      };
    }
  };

  createAPIRESTForIMGFields() {
    if (Meteor.isServer) {
      const self = this;
      const schema = self.schema;
      Object.keys(schema).forEach((field) => {
        if (schema[field].isImage) {
          console.log(
            "CREATE ENDPOINT GET " +
              `img/${this.collectionName}/${field}/:image ########## IMAGE #############`
          );
          this.apiRestImage &&
            this.apiRestImage.addRoute(
              `${this.collectionName}/${field}/:image`,
              (req: any, res: any) => {
                const { params } = req;

                if (params && !!params.image) {
                  const docID =
                    params.image.indexOf(".png") !== -1
                      ? params.image.split(".png")[0]
                      : params.image.split(".jpg")[0];
                  const doc = self
                    .getCollectionInstance()
                    .findOne({ _id: docID });

                  if (doc && !!doc[field] && doc[field] !== "-") {
                    const matches = doc[field].match(
                      /^data:([A-Za-z-+\/]+);base64,([\s\S]+)$/
                    );
                    const response: IResponse = {};

                    if (!matches || matches.length !== 3) {
                      const noimg = getNoImage(schema[field].isAvatar);
                      const tempImg = noimg.match(
                        /^data:([A-Za-z-+\/]+);base64,([\s\S]+)$/
                      );
                      return Buffer.from(tempImg![2], "base64");
                    }

                    response.type = matches[1];
                    response.data = Buffer.from(matches[2], "base64");
                    res.writeHead(200, {
                      "Content-Type": response.type,
                      "Cache-Control": "max-age=120, must-revalidate, public",
                      "Last-Modified": (
                        doc.lastupdate || new Date()
                      ).toUTCString(),
                    });
                    res.write(response.data);
                    res.end(); // Must call this immediately before return!
                    return;
                  }
                  res.writeHead(404);
                  res.end();
                  return;
                }
                res.writeHead(404);
                res.end();
                return;
              }
            );
        }
      });
    }
  }
  createAPIRESTThumbnailForIMGFields(sharp: any) {
    if (Meteor.isServer) {
      const self = this;
      const schema = self.schema;
      Object.keys(schema).forEach((field) => {
        if (schema[field].isImage) {
          console.log(
            "CREATE ENDPOINT GET " +
              `thumbnail/${this.collectionName}/${field}/:image ########## IMAGE #############`
          );
          this.apiRestImage &&
            this.apiRestImage.addThumbnailRoute(
              `${this.collectionName}/${field}/:image`,
              async (req: any, res: any) => {
                const { params } = req;

                if (params && !!params.image) {
                  const docID =
                    params.image.indexOf(".png") !== -1
                      ? params.image.split(".png")[0]
                      : params.image.split(".jpg")[0];
                  const doc = self
                    .getCollectionInstance()
                    .findOne({ _id: docID });

                  if (doc && !!doc[field] && doc[field] !== "-") {
                    const destructImage = doc[field].split(";");
                    const mimType = destructImage[0].split(":")[1];
                    const imageData = destructImage[1].split(",")[1];

                    try {
                      let resizedImage = Buffer.from(imageData, "base64");
                      resizedImage = await sharp(resizedImage)
                        .resize({
                          fit: "contain",
                          background: { r: 255, g: 255, b: 255, alpha: 0.01 },
                          width: 300,
                          height: 200,
                        })
                        .toFormat("png")
                        .toBuffer();

                      res.writeHead(200, {
                        "Content-Type": mimType,
                        "Cache-Control": "max-age=120, must-revalidate, public",
                        "Last-Modified": (
                          doc.lastupdate || new Date()
                        ).toUTCString(),
                      });
                      res.write(resizedImage);
                      res.end(); // Must call this immediately before return!
                      return;

                      //To Save Base64 IMG
                      // return `data:${mimType};base64,${resizedImage.toString("base64")}`
                    } catch (error) {
                      res.writeHead(200);
                      res.end();
                      return;
                    }
                  }
                  res.writeHead(404);
                  res.end();
                  return;
                }
              }
            );
        }
      });
    }
  }

  /**
   * Wrapper to register a publication of an collection.
   * @param  {String} publication - Name of the publication.
   * @param  {Function} newPublicationsFunction - Function the handle the publication of the data
   */
  addPublication = (publication: string, newPublicationsFunction: any) => {
    const self = this;

    if (Meteor.isServer) {
      Meteor.publish(
        `${self.collectionName}.${publication}`,
        newPublicationsFunction
      );
      self.publications[publication] = newPublicationsFunction;

      Meteor.publish(
        `${self.collectionName}.${"count" + publication}`,
        self.defaultCounterCollectionPublication(self, publication)
      );
      self.publications["count" + publication] =
        self.defaultCounterCollectionPublication(self, publication);
    } else {
      this.publications[publication] = true;
    }
  };

  addTransformedPublication = (
    publication: string,
    newPublicationsFunction: any,
    transformDocFunc: any
  ) => {
    const self = this;

    if (Meteor.isServer) {
      Meteor.publish(
        `${self.collectionName}.${publication}`,
        function (query, options) {
          const subHandle = newPublicationsFunction(query, options).observe({
            added: (document: { _id: string }) => {
              this.added(
                `${self.collectionName}`,
                document._id,
                transformDocFunc(document)
              );
            },
            changed: (newDocument: { _id: string }) => {
              this.changed(
                `${self.collectionName}`,
                newDocument._id,
                transformDocFunc(newDocument)
              );
            },
            removed: (oldDocument: { _id: string }) => {
              this.removed(`${self.collectionName}`, oldDocument._id);
            },
          });
          this.ready();
          this.onStop(() => {
            subHandle.stop();
          });
        }
      );

      self.publications[publication] = newPublicationsFunction;

      Meteor.publish(
        `${self.collectionName}.${"count" + publication}`,
        self.defaultCounterCollectionPublication(self, publication)
      );
      self.publications["count" + publication] =
        self.defaultCounterCollectionPublication(self, publication);
    } else {
      this.publications[publication] = true;
    }
  };

  /**
   * Wrapper to register a publication of an collection.
   * @param  {String} publication - Name of the publication.
   * @param  {Function} newPublicationsFunction - Function the handle the publication of the data
   */
  updatePublication = (publication: string, newPublicationsFunction: any) => {
    const self = this;

    if (Meteor.isServer) {
      Meteor.publish(
        `${self.collectionName}.${publication}`,
        newPublicationsFunction
      );
      self.publications[publication] = newPublicationsFunction;
    } else {
      this.publications[publication] = true;
    }
  };

  /**
   * Wrapper to register a publication of an collection.
   * @param  {String} publication - Name of the publication.
   * @param  {Function} newPublicationsFunction - Function the handle the publication of the data
   */
  addCompositePublication = (
    publication: string,
    newPublicationsFunction: any
  ) => {
    const self = this;

    if (Meteor.isServer) {
      // @ts-ignore
      Meteor.publishComposite(
        `${self.collectionName}.${publication}`,
        newPublicationsFunction
      );
    }
  };

  /**
   * Wrapper to create a Meteor Method.
   * @param  {String} name - Name of the new Meteor Method.
   * @param  {Function} func - Function to use in the Meteor Method.
   */
  registerMethod = (name: string, func: any) => {
    const action = name;
    const collection = this.collectionName;
    const methodFullName = `${this.collectionName}.${name}`;
    const schema = this.schema;

    const method = {
      [methodFullName](...param: any[]) {
        console.log("CALL Method:", name, param ? Object.keys(param) : "-");
        // Prevent unauthorized access

        // @ts-ignore
        const user = getUser(this.connection);

        try {
          const { connection } = this;
          const meteorContext = {
            collection,
            action,
            user,
            connection,
            schema,
          };

          // Here With pass the new Metoer Method with the framework
          // security and the meteor _context.
          const functionResult = func(...param, meteorContext);
          if (action === "insert") {
            // @ts-ignore
            meteorContext.docId = functionResult;
          }
          return functionResult;
        } catch (error) {
          throw error;
        }
      },
    };
    if (Meteor.isServer) {
      Meteor.methods(method);
    }
  };

  /**
   * Wrapper to register de default publication.
   * This is necessary to pass any publication for
   * every ACL rule, projection rules,
   * optimization process for the return of the data.
   * Any Mongo collection options will be set up here.
   */
  registerPublications(options: IBaseOptions) {
    if (!options.disableDefaultPublications) {
      this.addPublication("default", this.defaultCollectionPublication);
    }
  }

  defaultCollectionPublication(
    filter = {},
    optionsPub: Partial<IMongoOptions<Doc>>
  ) {
    if (!optionsPub) {
      optionsPub = { limit: 0, skip: 0 };
    }

    if (optionsPub.skip! < 0) {
      optionsPub.skip = 0;
    }

    if (optionsPub.limit! < 0) {
      optionsPub.limit = 0;
    }
    // Use the default subschema if no one was defined.
    if (
      !optionsPub.projection ||
      Object.keys(optionsPub.projection).length === 0
    ) {
      const tempProjection: { [key: string]: number } = {};
      Object.keys(this.schema)
        .concat(["_id", "createdby", "createdat", "lastupdate", "updatedby"])
        .forEach((key) => {
          tempProjection[key] = 1;
        });

      optionsPub.projection = tempProjection;
    }

    const imgFields: { [key: string]: any } = {};

    Object.keys(this.schema).forEach((field) => {
      if (this.schema[field].isImage) {
        imgFields["has" + field] = { $or: "$" + field };
        delete optionsPub.projection[field];
      }
    });

    const queryOptions = {
      fields: { ...optionsPub.projection, ...imgFields },
      limit: optionsPub.limit || 0,
      skip: optionsPub.skip || 0,
      transform: (doc: any) => {
        // for get path of image fields.
        return this.addImgPathToFields(doc);
      },
      sort: {},
    };

    if (optionsPub.transform) {
      queryOptions.transform = optionsPub.transform;
    }

    if (optionsPub.sort) {
      queryOptions.sort = optionsPub.sort;
    }

    return this.getCollectionInstance().find({ ...filter }, queryOptions);
  }

  defaultCounterCollectionPublication = (
    collection: ServerApiBase<Doc>,
    publishName: string
  ) => {
    return function (this: Subscription, ...params: any[]) {
      // observeChanges only returns after the initial added callbacks have run.
      // Until then, we don't want to send a lot of changed messages—hence
      // tracking the initializing state.
      const handlePub = collection.publications[publishName](...params);
      if (!!handlePub) {
        this.added("counts", `${publishName}Total`, {
          count: handlePub.count(),
        });
        this.ready();
        return;
      } else {
        this.added("counts", `${publishName}Total`, { count: 0 });
        this.ready();
        return;
      }
    };
  };

  /**
   * Get the collection instance.
   * @returns {Object} - Collection.
   */
  getCollectionInstance() {
    return this.collectionInstance;
  }

  /**
   * Register the CRUD methods to use then as
   * Meteor call.
   */
  registerAllMethods() {
    this.registerMethod("update", this.serverUpdate);
    this.registerMethod("insert", this.serverInsert);
    this.registerMethod("remove", this.serverRemove);
    this.registerMethod("upsert", this.serverUpsert);
    this.registerMethod("sync", this.serverSync);
    this.registerMethod("countDocuments", this.countDocuments);
    this.registerMethod("getDocs", this.serverGetDocs);
  }

  prepareData = (_docObj: Doc) => {
    const schema = this.schema;
    const schemaKeys = Object.keys(this.schema);
    const newDataObj: any = {};

    Object.keys(_docObj).forEach((key: string) => {
      let isDate: boolean;
      let data: any;

      // @ts-ignore
      data = _docObj[key];
      isDate = data && data instanceof Date && !isNaN(data.valueOf());

      if (schemaKeys.indexOf(key) !== -1) {
        let schemaData: any;
        schemaData = schema[key];
        if (
          schemaData.isImage &&
          (!hasValue(data) ||
            (hasValue(data) && data?.indexOf("data:image") === -1)) &&
          data !== "-"
        ) {
          // dont update if not have value field of image
        } else if (schema[key].isImage && data === "-") {
          newDataObj[key] = null;
        } else if (
          hasValue(data) &&
          schema[key] &&
          schema[key].type === Number
        ) {
          newDataObj[key] = Number(data);
        } else if (schema[key] && schema[key].type === Date && isDate) {
          newDataObj[key] = new Date(data);
        } else if (
          schema[key] &&
          Array.isArray(schema[key].type) &&
          !Array.isArray(data)
        ) {
          // No Save
        } else if (
          schema[key] &&
          !Array.isArray(schema[key].type) &&
          typeof schema[key].type === "object" &&
          !hasValue(data)
        ) {
          // No Save
        } else if (
          schema[key] &&
          schema[key].type === String &&
          data === null
        ) {
          // No Save
        } else if (schema[key] && schema[key].type !== Date) {
          newDataObj[key] = data;
        }
      }
    });

    return newDataObj;
  };

  /**
   * Check collections fields.
   * @param  {Object} _docObj - Document/Object the will be inseted.
   * @returns {Object} - The checked object for the subschema.
   */
  checkDataBySchema = (_docObj: Doc) => {
    const schema = this.getSchema();
    const schemaKeys = Object.keys(schema);
    const newDataObj = this.prepareData(_docObj);

    // Don't need to inform every field, but if they was listed
    // or informed, they can't be null.it
    const keysOfDataObj = Object.keys(newDataObj);

    // Remove from the Schema the optional fields not present in the DataObj.
    schemaKeys.forEach((field) => {
      if (
        schema[field].visibilityFunction &&
        !schema[field].visibilityFunction!(newDataObj)
      ) {
        delete newDataObj[field];
        return;
      } else if (
        !schema[field].optional &&
        keysOfDataObj.indexOf(field) !== -1 &&
        !hasValue(newDataObj[field])
      ) {
        throw new Meteor.Error(
          "Obrigatoriedade",
          `O campo "${schema[field].label || field}" é obrigatório`
        );
      } else if (keysOfDataObj.indexOf(field) !== -1) {
        if (!!newDataObj[field] || newDataObj[field] === 0) {
          // Call the check from Meteor.
          check(newDataObj[field], schema[field].type);
        }
      }
    });

    return newDataObj;
  };

  /**
   * Check if any updates occurs in
   * any document by any action.
   * @param  {Object} doc - Collection document.
   * @param  {String} action - Action the will be perform.
   * @param defaultUser
   */
  includeAuditData(
    doc: Doc | Partial<Doc>,
    action: string,
    defaultUser: string = "Anonymous"
  ) {
    const userId = getUser() ? getUser()?._id : defaultUser;
    if (action === "insert") {
      doc.createdby = userId;
      doc.createdat = new Date();
      doc.lastupdate = new Date();
      doc.updatedby = userId;
    } else {
      doc.lastupdate = new Date();
      doc.updatedby = userId;
    }
  }

  /**
   * Perform a insert or update on collection.
   * @param  {Object} _docObj - Collection document the will be inserted or updated.
   * @param  {Object} _context - Meteor this _context.
   * return {Object} doc inserted or updated
   */
  serverSync = (_docObj: Doc, _context: IContext) => {
    if (!_docObj || !_docObj._id) {
      return false;
    }

    if (_docObj.needSync) {
      delete _docObj.needSync;
    }
    const oldDoc = this.getCollectionInstance().findOne({ _id: _docObj._id });

    if (
      !(
        ((!oldDoc || !oldDoc._id) && this.beforeInsert(_docObj, _context)) ||
        this.beforeUpdate(_docObj, _context)
      )
    ) {
      return false;
    }

    if (!oldDoc || !oldDoc._id) {
      _docObj = this.checkDataBySchema(_docObj);
      this.includeAuditData(_docObj, "insert");
      const insertId = this.getCollectionInstance().insert(_docObj);
      return { ..._docObj, _id: insertId };
    }
    let docToSave;
    if (
      !!_docObj.lastupdate &&
      !!oldDoc.lastupdate &&
      new Date(_docObj.lastupdate) > new Date(oldDoc.lastupdate)
    ) {
      console.log("APP MAIOR");
      docToSave = _docObj;
    } else {
      console.log("Server MAIOR");
      docToSave = oldDoc;
    }

    docToSave = this.checkDataBySchema(docToSave);
    this.includeAuditData(docToSave, "update");

    this.getCollectionInstance().update(_docObj._id, {
      $set: docToSave,
    });
    return this.getCollectionInstance().findOne({ _id: _docObj._id });
  };

  /**
   * Perform a insert or update on collection.
   * @param  {Object} _docObj - Collection document the will be inserted or updated.
   * @param  {Object} _context - Meteor this _context.
   */
  serverUpsert(_docObj: Doc | Partial<Doc>, _context: IContext) {
    if (!_docObj._id) {
      const insert = this.serverInsert(_docObj, _context);

      // @ts-ignore
      _docObj._id = insert;
      return insert;
    }
    return this.serverUpdate(_docObj, _context);
  }

  /**
   * Perform a remove on an collection.
   * @param  {Object} _docObj - Collection document the will be removed.
   * @param  {Object} _context - Meteor this _context.
   */
  serverRemove(_docObj: Doc | Partial<Doc>, _context: IContext) {
    try {
      if (this.beforeRemove(_docObj, _context)) {
        const id = _docObj._id;
        check(id, String);
        const result = this.getCollectionInstance().remove(id);
        this.afterRemove(_docObj, _context);
        return result;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  prepareDocForUpdate = (
    doc: Doc,
    oldDoc: any,
    nullValues: { [key: string]: string }
  ) => {
    const newDoc: any = {};
    Object.keys(doc).forEach((key: any) => {
      // @ts-ignore
      let docData = doc[key];
      const isDate =
        docData && docData instanceof Date && !isNaN(docData.valueOf());

      if (
        !!nullValues &&
        !docData &&
        docData !== 0 &&
        typeof docData !== "boolean"
      ) {
        nullValues[key] = "";
      } else if (
        key !== "_id" &&
        ["lastupdate", "createdat", "createdby", "updatedby"].indexOf(key) ===
          -1 &&
        !isDate &&
        isObject(docData) &&
        !isArray(docData)
      ) {
        newDoc[key] = merge(oldDoc[key] || {}, docData);
      } else {
        newDoc[key] = docData;
      }
    });
    return newDoc;
  };

  /**
   * Perform a Update on an collection.
   * @param  {Object} _docObj - Collection document the will be updated.
   * @param  {Object} _context - Meteor this _context.
   */
  serverUpdate(_docObj: Doc | Partial<Doc>, _context: IContext) {
    try {
      check(_docObj._id, String);
      const id = _docObj._id;
      if (this.beforeUpdate(_docObj, _context)) {
        _docObj = this.checkDataBySchema(_docObj as Doc);
        this.includeAuditData(_docObj, "update");
        const oldData = this.getCollectionInstance().findOne({ _id: id }) || {};
        const nullValues = {};

        const preparedData = this.prepareDocForUpdate(
          _docObj as Doc,
          oldData,
          nullValues
        );
        const action: { [key: string]: any } = {
          $set: preparedData,
        };
        if (Object.keys(nullValues).length > 0) {
          action["$unset"] = nullValues;
        }

        const result = this.getCollectionInstance().update({ _id: id }, action);
        preparedData._id = id;
        this.afterUpdate(preparedData, _context);
        return result;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Perform a insert on an collection.
   * @param  {Object} _docObj - Collection document the will be inserted.
   * @param  {Object} _context - Meteor this _context.
   */
  serverInsert(_docObj: Doc | Partial<Doc>, _context: IContext) {
    try {
      const id = _docObj._id;
      if (this.beforeInsert(_docObj, _context)) {
        _docObj = this.checkDataBySchema(_docObj as Doc);
        this.includeAuditData(_docObj, "insert");
        if (id) {
          _docObj._id = id;
        }
        const result = this.getCollectionInstance().insert(_docObj);
        this.afterInsert(
          Object.assign({ _id: id || result }, _docObj),
          _context
        );
        if (_context.rest) {
          _context.rest.response.statusCode = 201;
        }
        return result;
      }
      return null;
    } catch (insertError) {
      throw insertError;
    }
  }

  /**
   * @returns {String} - Return the number of documents from a collection.
   */
  countDocuments() {
    return this.getCollectionInstance().find().count();
  }

  /**
   * Perform an action before allows an document be inserted.
   * In this case, we have a check ACL for the user and the collection the will be
   * affected by any updates. So this guarantees the user has to have
   * access to modify this collection.
   * Others actions can be executed in here.
   * @param  {Object} _docObj - Document the will be inserted.
   * @param  {Object} _context - Meteor this _context.
   * (If we don't have _context, undefied will be set to this.)
   * @returns {Boolean} - Returns true for any action.
   */
  beforeInsert(_docObj: Doc | Partial<Doc>, _context: IContext) {
    return true;
  }

  /**
   * Perform an action before allows an documents be imported.
   * In this case, we have a check ACL for the user and the collection the will be
   * affected by any updates. So this guarantees the user has to have
   * access to modify this collection.
   * Others actions can be executed in here.
   * @param _docObj
   * @param  {Object} _context - Meteor this _context.
   * If we don't have _context, undefied will be set to this.)
   * @returns {Boolean} - Returns true for any action.
   */
  beforeImport(_docObj: Doc | Partial<Doc>, _context: IContext) {
    return true;
  }

  /**
   * Perform an action before allows an documents be updated.
   * In this case, we have a check ACL for the user and the collection the will be
   * affected by any updates. So this guarantees the user has to have
   * access to modify this collection.
   * Others actions can be executed in here.
   * @param _docObj
   * @param  {Object} _context - Meteor this _context.
   * (If we don't have _context, undefied will be set to this.)
   * @returns {Boolean} - Returns true for any action.
   */
  beforeUpdate(_docObj: Doc | Partial<Doc>, _context: IContext) {
    return true;
  }

  /**
   * Perform an action before allows an documents be removed.
   * In this case, we have a check ACL for the user and the collection the will be
   * affected by any updates. So this guarantees the user has to have
   * access to modify this collection.
   * Others actions can be executed in here.
   * @param  {Object} _docObj - Documents the will be removed.
   * @param  {Object} _context - Meteor this _context.
   * (If we don't have _context, undefied will be set to this.)
   * @returns {Boolean} - Returns true for any action.
   */
  beforeRemove(_docObj: Doc | Partial<Doc>, _context: IContext) {
    return true;
  }

  /**
   * Use this as an extension point, to perform any action
   * after or before action modify a collection/document.
   * @param  {Object} _docObj - Document the will be changed
   * @returns {Object} - Object updated with the current status.
   */
  beforeUpsert(_docObj: Doc | Partial<Doc>) {
    return {
      ..._docObj,
      collection: this.collectionName,
    };
  }

  /**
   * Use this as an extension point, to perform any action
   * after or before action modify a collection/document.
   * @param  {Object} _docObj - Document the will be changed
   * @returns {Object} - Object updated with the current status.
   */
  afterImport(_docObj: Doc | Partial<Doc>) {
    return {
      ..._docObj,
      collection: this.collectionName,
    };
  }

  /**
   * Use this as an extension point, to perform any action
   * after or before action modify a collection/document.
   * @param  {Object} _docObj - Document the will be changed
   * @param _context
   * @returns {Object} - Object updated with the current status.
   */
  afterInsert(_docObj: Doc | Partial<Doc>, _context?: IContext) {
    return {
      ..._docObj,
      collection: this.collectionName,
    };
  }

  /**
   * Use this as an extension point, to perform any action
   * after or before action modify a collection/document.
   * @param  {Object} _docObj - Document the will be changed
   * @param _context
   * @returns {Object} - Object updated with the current status.
   */
  afterUpdate(_docObj: Doc, _context: IContext) {
    const document = {
      ..._docObj,
      collection: this.collectionName,
    };

    const schema = this.getSchema();
    const unsetFields: { [key: string]: string } = {};
    Object.keys(schema).forEach((field) => {
      if (
        schema[field].visibilityFunction &&
        !schema[field].visibilityFunction!(_docObj)
      ) {
        unsetFields[field] = "";
      }
    });

    if (Object.keys(unsetFields).length > 0) {
      this.getCollectionInstance().update(
        { _id: _docObj._id },
        {
          $unset: unsetFields,
        }
      );
    }
    return document;
  }

  /**
   * Use this as an extension point, to perform any action
   * after or before action modify a collection/document.
   * @param  {Object} _docObj - Document the will be changed
   * @param _context
   * @returns {Object} - Object updated with the current status.
   */
  afterRemove(_docObj: Doc | Partial<Doc>, _context: IContext) {
    return {
      ..._docObj,
      collection: this.collectionName,
    };
  }

  /**
   * Get docs with Meteor.call.
   * @param  {String} publicationName - Publication Name
   * @param  {Object} filter - Collection Filter
   * @param  {Object} optionsPub - Options Publication, like publications.
   * @returns {Array} - Array of documents.
   */
  serverGetDocs(
    publicationName = "default",
    filter = {},
    optionsPub: IMongoOptions<Doc>
  ) {
    const result = this.publications[publicationName](filter, optionsPub);
    if (result) {
      return result.fetch();
    } else {
      return null;
    }
  }

  /**
   * Wrapper to find items on an collection.
   * This guarantees the the action will be executed
   * by a Meteor Mongo Collection of this framework.
   * @param  {Object} query - Params to query a document.
   * @param  {Object} projection - Params to define which fiedls will return.
   */
  find(query: object = {}, projection: object = {}) {
    return this.getCollectionInstance().find(query, projection);
  }

  /**
   * Wrapper to findOne items on an collection.
   * This guarantees the the action will be executed
   * by a Meteor Mongo Collection of this framework.
   * @param  {Object} query - Params to query a document.
   * @param  {Object} projection - Params to define which fiedls will return.
   */
  findOne(query: object = {}, projection: object = {}) {
    return this.getCollectionInstance().findOne(query, projection);
  }
}
