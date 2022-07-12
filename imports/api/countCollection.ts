import { Mongo } from "meteor/mongo";

export const countsCollection = new Mongo.Collection("countsCollection");
countsCollection.deny({
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
