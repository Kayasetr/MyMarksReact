import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import Manager from '../src/Manager'
import LoginPage from '../src/LoginPage'
import HomeStack from './homeStack'
import OtherGroupsStack from './otherGroupsStack'
import { Colors } from '../styles/global';
import { CustomDrawer } from './customDrawer'

const RootDrawerNavigator = createDrawerNavigator({
    HomeStack: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Главная',
        drawerIcon: () => (
          <Ionicons name='ios-log-in' size={24} color={Colors.mainColor} />
        ),
      })
    },
    OtherGr: {
      screen: OtherGroupsStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Другие группы',
        drawerIcon: () => (
          <Ionicons name='ios-people' size={24} color={Colors.mainColor} />
        )
        })
      },
    },{
      //edgeWidth: -100,
      initialRouteName: 'HomeStack',
      contentComponent: CustomDrawer,
      
      contentOptions: {
        activeTintColor: '#282856',
        activeBackgroundColor: '#dddddd',
      },
      drawerLockMode: 'locked-open',
    });

export default createAppContainer(RootDrawerNavigator)