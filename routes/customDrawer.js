import {DrawerItems} from 'react-navigation-drawer'
import React from 'react';
import { Colors } from '../styles/global';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text} from 'react-native';

export function CustomDrawer (props)  {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <ImageBackground
                  source={require('../assets/splscreen.png')}
                  style={{ width:150, height:50, marginTop: 20}}
                  resizeMode='cover'/> 
            </View>
            <DrawerItems
                iconContainerStyle={styles.icons}
                {...props}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#efefef',
        flex: 1,
    },
    subContainer:{
        flexDirection:'column',
        alignItems: 'center', 
        justifyContent: 'center',
        height: '20%',
        width: '100%',
        backgroundColor: [Colors.mainColor]
    }
})