import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';

userprofileServerApi.getCollectionInstance().createIndex({ _id: 1, name: 1 });
