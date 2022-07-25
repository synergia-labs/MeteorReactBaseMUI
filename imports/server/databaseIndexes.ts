import { userprofileServerApi } from '/imports/userprofile/api/UserProfileServerApi';

userprofileServerApi.getCollectionInstance().createIndex({ _id: 1, name: 1 });
