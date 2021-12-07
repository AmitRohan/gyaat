import {StorageManager} from './StorageManager';

const ItemStoreKey = 'ItemStoreKey';

const ItemStore = {
  addItem: async item => {
    try {
      let items = (await StorageManager.getObject(ItemStoreKey)) || [];
      items.push(item);
      return StorageManager.storeObject(ItemStoreKey, items);
    } catch (e) {
      console.log(e);
      return StorageManager.storeObject(ItemStoreKey, [item]);
    }
  },
  getItems: async _ => {
    return StorageManager.getObject(ItemStoreKey);
  },
  clearItems: async _ => {
    return StorageManager.storeObject(ItemStoreKey, []);
  },
};

export {ItemStore};
