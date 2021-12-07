import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ItemsScreen from './screens/ItemsScreen';
import UsersScreen from './screens/UsersScreen';
const Stack = createStackNavigator();

const ItemsScreenNavigations = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Items" component={ItemsScreen} />
      <Stack.Screen name="New Item" component={ItemsScreen} />
    </Stack.Navigator>
  );
};

const UsersScreenNavigations = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Users" component={UsersScreen} />
      <Stack.Screen name="New User" component={UsersScreen} />
    </Stack.Navigator>
  );
};

export {ItemsScreenNavigations, UsersScreenNavigations};
