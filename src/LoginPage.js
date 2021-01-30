import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackground, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Colors } from '../styles/global';
import 'firebase/firestore';
import jsonGroups from '../avn/group.json'
import jsonStudents from '../avn/students.json'
import jsonSubjects from '../avn/subject.json'
import jsonWays from '../avn/way.json'
import { AddToTheBase } from "./AddToTheBase";
import {firebaseConfig} from './config/FirebaseConfig';
import * as firebase from "firebase";
import { TouchableOpacity } from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
export default function LoginPage({navigation}) {
  const dbh = firebase.firestore()
  var subjects = [];
  var isExist = false;
  const [login, setLogin] = useState('')
  const pressHandler = () => {
    if (login.trim() == ''){
      alert('Введите логин')
    }else{
      jsonStudents.students.find(function (studEl) {
        if(studEl.studentLogin == login) {    
          isExist = true
          jsonGroups.groups.find(function (groupEl) {
            if(groupEl.groupId == studEl.groupId) {
              navigation.navigate('Manager', {
                user: [login + ' ('+ studEl.groupName + ')'], 
                status: ['статус: Студент'],
                wayid: [groupEl.wayId],
                group: [groupEl.groupId]
                })
              return true
            }
          })
          return true  
        }
      })
      if(!isExist){
      alert('Не верный логин')
      }
     //if(login == '18/1024'){
     //  navigation.navigate('Manager', {user: [login], status: ['статус: Администратор']})
     //}else if (login == '18/5477'){
     //  navigation.navigate('Manager', {user: [login], status: ['статус: Менеджер']})
     //}else {
     //  navigation.navigate('Manager', {user: [login], status: ['статус: Студент']})
     //}
    }
  }
  return (
    <LinearGradient colors={[Colors.mainColor, Colors.altDarkMainColor, Colors.altMainColor]} style={styles.gradient}>
      <StatusBar style="light" />
      <View style={styles.loginContainer}>
          <Text style={styles.text}>Войдите</Text>
          <View style={styles.input}>  
            <MaterialIcons name='person' size={24} color={Colors.mainColor}/>
            <TextInput 
              style={{
                flex:1,
                marginHorizontal: 7, 
                width: '40%',}}
              onChangeText={setLogin}
              login={login}
              placeholder="Логин"
              placeholderTextColor={Colors.mainColor}/>
          </View>   
          
            <LinearGradient end={{x: 1, y: 0}} colors={[[Colors.altDarkMainColor], [Colors.mainColor]]}  style={{borderRadius: 3}}>
              <TouchableOpacity onPress={pressHandler} style={{
                margin: 5,
                alignItems:'center',
                justifyContent:'center',
                }}>
                <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', letterSpacing: 0.5}}>Войти</Text>
              </TouchableOpacity>
            </LinearGradient>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width:'100%',
    height:'100%',
    alignItems: 'center',
    justifyContent:'center',
  },
  loginContainer: {
    backgroundColor: '#fff9',
    padding: 8,
    borderRadius: 5,
  },
  text: {
    margin: 5, 
    marginHorizontal: 100,
    alignItems:'center',
    justifyContent:'center'
  },
  input: {
    flexDirection: 'row',
    margin:15,
    padding: 5,
    borderStyle:"solid",
    borderWidth:1,
    borderColor: [Colors.mainColor],
    borderRadius: 20
  },
});
