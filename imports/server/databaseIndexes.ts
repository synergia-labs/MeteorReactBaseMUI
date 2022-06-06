import { userprofileApi } from "/imports/userprofile/api/UserProfileApi";

userprofileApi.getCollectionInstance().createIndex({ _id: 1, name: 1 });
