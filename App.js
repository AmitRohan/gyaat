/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Appearance, Image} from 'react-native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import DashboardScreen from './screens/DashboardScreen';
import merge from 'deepmerge';

import {
  ItemsScreenNavigations,
  TableScreenNavigations,
  UsersScreenNavigations,
} from './AppSubNavigation';

const tablesIcon = require('./assets/icons/tables.png');
const dashboardIcon = require('./assets/icons/dashboard.png');
const itemsIcon = require('./assets/icons/items.png');
const usersIcon = require('./assets/icons/users.png');

const Tab = createBottomTabNavigator();
const tabBarActiveTintColor = 'green';
const tabBarInactiveTintColor = 'red';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const AppTheme =
  Appearance.getColorScheme() === 'dark'
    ? CombinedDarkTheme
    : CombinedDefaultTheme;

const App = () => {
  return (
    <PaperProvider theme={AppTheme}>
      <NavigationContainer theme={AppTheme}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: route.name === 'Dashboard', // SHOW ONLY FOR DASHBOARD
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              let tintColor;
              if (focused) {
                tintColor = tabBarActiveTintColor;
              } else {
                tintColor = tabBarInactiveTintColor;
              }

              switch (route.name) {
                case 'Tables':
                  iconName = tablesIcon;
                  break;
                case 'Items':
                  iconName = itemsIcon;
                  break;
                case 'Users':
                  iconName = usersIcon;
                  break;
                case 'Dashboard':
                  iconName = dashboardIcon;
                  break;
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
          <Tab.Screen name="Tables" component={TableScreenNavigations} />
          <Tab.Screen name="Items" component={ItemsScreenNavigations} />
          <Tab.Screen name="Users" component={UsersScreenNavigations} />
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            // options={{tabBarBadge: 3}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
