import {StorageManager} from './StorageManager';

const TableStoreKey = 'TableStoreKey';

const TableStore = {
  addItem: async item => {
    try {
      let items = (await StorageManager.getObject(TableStoreKey)) || [];
      items.push(item);
      return StorageManager.storeObject(TableStoreKey, items);
    } catch (e) {
      console.log(e);
      return StorageManager.storeObject(TableStoreKey, [item]);
    }
  },
  getItems: async _ => {
    return StorageManager.getObject(TableStoreKey);
  },
  updateItem: async table => {
    return StorageManager.storeObject(TableStoreKey, table);
  },
  clearItems: async _ => {
    return StorageManager.storeObject(TableStoreKey, []);
  },
};

export {TableStore};
