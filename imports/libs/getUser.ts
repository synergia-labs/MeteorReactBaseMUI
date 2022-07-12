import shortid from "shortid";
import { Meteor } from "meteor/meteor";
import { EnumUserRoles } from "/imports/userprofile/api/EnumUser";
import { IUserProfile } from "../userprofile/api/UserProfileSch";

export const userprofileData = {
  collectionInstance: undefined,
};

/**
 * Return Logged User if exists.
 * @return {Object} Logged User
 */
export const getUser = (connection?: { id: string } | null): IUserProfile => {
  if (Meteor.isClient && Meteor.status().status !== "connected") {
    if (!!window && !!window.$app && !!window.$app.user) {
      return window.$app.user;
    }
  }

  try {
    if (!userprofileData.collectionInstance) {
      console.log("UserProfile Collection not Avaliable");
      return Meteor.user();
    }
    const userProfile = userprofileData.collectionInstance.findOne({
      email: Meteor.user().profile.email,
    });

    if (userProfile) {
      return userProfile;
    }

    const d = new Date();
    const simpleDate = `${d.getFullYear()}${d.getMonth() + 1}${d.getDay()}`;
    const id =
      connection && connection.id
        ? simpleDate + connection.id
        : shortid.generate();

    return {
      id,
      _id: id,
      roles: [EnumUserRoles.PUBLICO],
    };
  } catch (e) {
    const d = new Date();
    const simpleDate = `${d.getFullYear()}${d.getMonth() + 1}${d.getDay()}`;
    const id =
      connection && connection.id
        ? simpleDate + connection.id
        : shortid.generate();
    return {
      id,
      _id: id,
      roles: [EnumUserRoles.PUBLICO],
    };
  }
};

const SYSTEM_USER = Object.freeze({
  email: "SYSTEM@SYSTEM",
  username: "Sistema",
  _id: "SYSTEM",
  blocked: false,
  createdat: new Date(),
  createdby: "SYSTEM",
});

/**
 * Usuario reprensentando o sistema, para ações não realizadas por usuarios.
 */
export function getSystemUserProfile(): IUserProfile | undefined {
  if (Meteor.isClient) {
    return undefined;
  }
  return SYSTEM_USER;
}
