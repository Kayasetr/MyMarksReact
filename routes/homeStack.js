import {createStackNavigator} from 'react-navigation-stack';
import Manager from '../src/Manager';
import LoginPage from '../src/LoginPage';
import Header from '../shared/header';
import React from 'react';
import {Colors} from '../styles/global'

const screens = {
    LoginPage: {
        screen: LoginPage,
        navigationOptions: {
            headerShown: false,
        },
    },
    Manager: {
        screen: Manager,
        navigationOptions: ({navigation}) => {
            return {
                 headerTitle: () => <Header navigation={navigation} title='MyMarks'/>
             }
        }
    },
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerLeft:() => null,
        headerStyle: {backgroundColor: [Colors.mainColor]}
    }
});

export default HomeStack;