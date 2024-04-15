import { userprofileServerApi } from '/imports/modules/userprofile/api/UserProfileServerApi';

userprofileServerApi.getCollectionInstance().createIndex({ _id: 1, name: 1 });
