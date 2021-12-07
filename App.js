/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';

const tablesIcon = require('./assets/icons/tables.png');
const dashboardIcon = require('./assets/icons/dashboard.png');
const itemsIcon = require('./assets/icons/items.png');
const usersIcon = require('./assets/icons/users.png');

const Tab = createBottomTabNavigator();
const tabBarActiveTintColor = 'green';
const tabBarInactiveTintColor = 'red';
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let tintColor;
            if (focused) {
              tintColor = tabBarInactiveTintColor;
            } else {
              tintColor = tabBarActiveTintColor;
            }
            if (route.name === 'Home') {
              iconName = tablesIcon;
            } else if (route.name === 'Settings') {
              iconName = dashboardIcon;
            }
            return (
              <Image
                source={iconName}
                tintColor={tintColor}
                style={{
                  width: size,
                  height: size,
                  borderRadius: size,
                  tintColor: tintColor,
                }}
              />
            );
          },
          tabBarActiveTintColor: tabBarActiveTintColor,
          tabBarInactiveTintColor: tabBarInactiveTintColor,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
