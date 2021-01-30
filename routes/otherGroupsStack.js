import {createStackNavigator} from 'react-navigation-stack';
import OtherGr from '../src/OtherGr'
import React from 'react'
import {Colors} from '../styles/global'
import Header from '../shared/header';


const screens = {
    OtherGr: {
        screen: OtherGr,
        navigationOptions: ({navigation}) => {
            return {
                 headerTitle: () => <Header navigation={navigation} title='MyMarks'/>
             }
         }
    }
}

const OtherGroupsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerLeft: null,
        headerStyle: {backgroundColor: [Colors.mainColor]}
    }
});

export default OtherGroupsStack;