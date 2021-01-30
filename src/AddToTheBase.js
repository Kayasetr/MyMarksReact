import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Button, 
    TouchableOpacity, 
    ToastAndroid, 
    Alert, 
    Picker, 
    Platform
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import jsondata from '../avn/group.json'
import {firebaseConfig} from './config/FirebaseConfig';
import {Colors} from '../styles/global'
import {LinearGradient} from 'expo-linear-gradient'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  

export const AddToTheBase = ({onSubmit}) => {
    const [selectedValue, setSelectedValue] = useState("");
    
    const dbh = firebase.firestore();
    const [pickerGroups, setPickerGroups] = useState([]);

    
    
    return(
        <View></View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom:5,
    },
    input: {
        marginVertical:3,
        padding: 3,
        paddingHorizontal:10,
        borderStyle:"solid",
        borderBottomWidth:2,
       // backgroundColor:'white',
        borderColor:[Colors.altDarkMainColor],
    },
    picker: {
        color:[Colors.altMainColor],
        marginVertical:3,
        padding: 3,
        borderStyle:"solid",
        borderBottomWidth:2,
        borderColor:[Colors.altDarkMainColor],
    }
})