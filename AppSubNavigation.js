import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ItemsScreen from './screens/ItemsScreen';
import UsersScreen from './screens/UsersScreen';
import NewUserModal from './screens/NewUserModal';
import NewItemModal from './screens/NewItemModal';
import TablesScreen from './screens/TablesScreen';
import NewTableModal from './screens/NewTableModal';
const Stack = createStackNavigator();

const ItemsScreenNavigations = () => (
  <Stack.Navigator>
    <Stack.Screen name="Item List" component={ItemsScreen} />
    <Stack.Screen name="New Item" component={NewItemModal} />
  </Stack.Navigator>
);

const UsersScreenNavigations = () => (
  <Stack.Navigator>
    <Stack.Screen name="User List" component={UsersScreen} />
    <Stack.Screen name="New User" component={NewUserModal} />
  </Stack.Navigator>
);

const TableScreenNavigations = () => (
  <Stack.Navigator>
    <Stack.Screen name="Table List" component={TablesScreen} />
    <Stack.Screen name="New Table" component={NewTableModal} />
  </Stack.Navigator>
);

export {ItemsScreenNavigations, UsersScreenNavigations, TableScreenNavigations};
