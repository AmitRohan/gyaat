import AsyncStorage from '@react-native-community/async-storage';

const StorageManager = {
  storeString: async (key, value) => {
    return await AsyncStorage.setItem(key, value);
  },

  getData: async key => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },

  storeObject: async (key, value) => {
    const stringValue = JSON.stringify(value);
    return await AsyncStorage.setItem(key, stringValue);
  },
  getObject: async key => {
    try {
      let jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : jsonValue;
    } catch (e) {
      return null;
    }
  },
};

export {StorageManager};
