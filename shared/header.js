import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Platform} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function Header ({navigation, title}) {

const openMenu = () => {
    navigation.openDrawer()
}
const leaveFromApp = () => {
    if(Platform.OS != 'web') {
        Alert.alert(
            "Выход",
            "Вы действительно хотите выйти?",
            [
              {
                text: "Нет",
                onPress: () => {},
              },
              { text: "Да", onPress: () => {
                navigation.goBack()
            }},
            ],
            { cancelable: true }
        );
    }else{
        navigation.goBack()
    }
}
    return (
        <View style={styles.header}>
            <MaterialCommunityIcons style={styles.icon}  name='menu' size={28} onPress={openMenu}/>
            <Text style={styles.headerText}>
                {title}
            </Text> 
            <MaterialCommunityIcons style={styles.iconLeave}  name='logout' size={28} onPress={leaveFromApp}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        marginHorizontal: 110,
        letterSpacing: 1,  
    },
    icon: {
        color: 'white',
        position: 'absolute',
        left: 1
    },
    iconLeave: {
        color: 'white',
        position: 'absolute',
        right: 1
    }
})