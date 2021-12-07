import {StorageManager} from './StorageManager';

const UserStoreKey = 'UserStoreKey';

const UserStore = {
  addItem: async item => {
    try {
      let items = (await StorageManager.getObject(UserStoreKey)) || [];
      items.push(item);
      return StorageManager.storeObject(UserStoreKey, items);
    } catch (e) {
      console.log(e);
      return StorageManager.storeObject(UserStoreKey, [item]);
    }
  },
  getItems: async _ => {
    return StorageManager.getObject(UserStoreKey);
  },
  clearItems: async _ => {
    return StorageManager.storeObject(UserStoreKey, []);
  },
};

export {UserStore};
