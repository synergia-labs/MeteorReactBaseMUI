import { userprofileServerApi } from '../modules/userprofile/api/userProfileServerApi';

userprofileServerApi.getCollectionInstance().createIndex({ _id: 1, name: 1 });
