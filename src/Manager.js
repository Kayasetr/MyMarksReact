import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  Button,
  Picker,
  BackHandler,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ScrollView,
  TextInput,
  Platform,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import Header from '../shared/header';
import {Colors} from '../styles/global'
import jsonGroups from '../avn/group.json'
import jsonStudents from '../avn/students.json'
import jsonSubjects from '../avn/subject.json'
import jsonWays from '../avn/way.json'
import * as firebase from "firebase";

import "firebase/firestore";
import { firebaseConfig } from "./config/FirebaseConfig";
// import { ScrollView } from 'react-native-gesture-handler';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Manager({navigation}) {
  const [group, setGroup] = useState('')
  const [name, setName] = useState('')
  const [subj, setSubj] = useState('')
  const [mark, setMark] = useState('')
  const [pickerStuds, setPickerStuds] = useState([])
  const [subjTest, setSubjTest] = useState([])
  const [pickerGroups, setPickerGroups] = useState([]);
  const [data, setData] = useState([]);
  const [studs, setStuds] = useState([]);
  const [status, setStatus] = useState(''); 
  const [isOpened, setOpened] = useState(false);
  const dbh = firebase.firestore();
  var way = ''
  var studGroup = ''
  var oneGroupStuds = []
  var subjects = []
  var studNames = [];
  
    const showStudNames = () => {
      dbh
        .collection("ПИ-1-18")
        .get()
        .then(function (querySnapshot) {
          setStuds('')
          querySnapshot.forEach(function (doc) {
           let studName = doc.id.toString();
           studNames.push({name: studName})
           //studNames = studs => [...studs, {name: [studName]}]
           setStuds(studNames)
          });
        })
        .catch(function (error) {
          alert("Ошибка: " + error);
        });
    }

  useEffect(() => {
    showStudNames()
    setSelectedStudent(navigation.getParam('user'))
    setStatus(navigation.getParam('status'))
    studGroup = navigation.getParam('group')
    jsonStudents.students.find(function (studEl) {
      if(studGroup == studEl.groupId){
        oneGroupStuds.push(studEl.studentName)
        setPickerStuds(oneGroupStuds)
      }
    })
    way = navigation.getParam('wayid')
    jsonSubjects.subjects.find(function (subjEl) {
      if(way == subjEl.wayId) {
        subjects.push(subjEl.subjectName)
        setSubjTest(subjects)
      }
    })
  }, []);

  const addToTheBase = () => { 
    if(mark.trim()){
        const dbhRef = dbh.collection(group).doc(name);
        dbhRef
        .set({[subj]: mark}, {merge : true})
        .catch(function (error) {
            alert("Ошибка"+ error)
        }) 
    }else{
        if (Platform.OS == "android") {
            ToastAndroid.show("Заполните все поля!", ToastAndroid.SHORT);
          } else if (Platform.OS == "ios") {
            Alert.alert("Заполните все поля!");
          } else {
            alert("Заполните все поля!");
          }
    }
  }

    const deleteStudent = (id) =>
      Alert.alert(
        "Удалить данные студента?",
        "Вы действительно хотите удалить данные студента " + id.toString() + "?",
        [
          {
            text: "Отмена",
            onPress: () => {},
          },
          { text: "OK", onPress: () => {
            dbh.collection("ПИ-1-18").doc(id.toString()).delete().then(function() {
              alert(id + " Успешно удален")
          }).catch(function(error) {
              alert("Ошибка: ", error);
          });
          setStuds((prevStud) => {
            return prevStud.filter(student => student.name != id.toString())
          })
        }},
        ],
        { cancelable: true }
      );


    const backAction = () => {
      if(isOpened) {
      setOpened(false)
      setStuds(studNames)
      }
      return true;
    };
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    const displayStudMarks = (item) => {  
      if(isOpened) {
        setOpened(false)
        //setStuds(studNames)
        showStudNames()
      }else {
        setOpened(true)
      dbh
        .collection("ПИ-1-18").doc(item.toString())
        .get()
        .then(function(doc) {
          if (doc.exists) {
            Object.entries(doc.data()).map(([key, value]) => {
              setStuds([{name: [key], mark: [value]}])
            })
          } else {
              alert('Студент не найден')
          }
        })
        .catch(function (error) {
          alert("Ошибка: " + error);
        });
        setSelectedValue(item)
      }
    }
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(""); 

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
  return (
    <LinearGradient colors={[Colors.mainColor, Colors.altDarkMainColor, Colors.altMainColor]} style={{flex: 1, width:'100%', height:'100%'}}>
      <StatusBar style="light" />
      <View style={styles.studInfo}>
        <Text style={[{
          marginVertical: 3,
          marginLeft: 15, 
          width: '50%'}, styles.studInfoText]}>
          {selectedStudent} 
        </Text>
        <Text style={[{
          fontStyle: 'italic',
          marginVertical: 3,
          width: '50%',
          },styles.studInfoText]}>
          {status} 
        </Text>
      </View>
      <View style={styles.mainContainer}> 
          <View style={styles.addContainer}>
              <Picker
                  style={{color: [Colors.mainColor]}}
                  selectedValue={group}
                  onValueChange={(itemValue, itemIndex) => {
                    setGroup(itemValue);
                  }}>
                  {jsonGroups.groups.map((item, index) => {
                      return (
                        <Picker.Item label={item.groupName} value={item.groupName} key={index} />
                      );
                    })}
              </Picker>
              <Picker
                style={{color: [Colors.mainColor]}}
                selectedValue={name}
                onValueChange={(itemValue, itemIndex) => {
                setName(itemValue);
                }}>
                {pickerStuds.map((item) => {
                  return (
                    <Picker.Item label={item} value={item} key={item} />
                  );
                })}
              </Picker>
            <TextInput 
              style={styles.input}
              onChangeText={setName}
              name={name}
              placeholder="Имя"
              placeholderTextColor={[Colors.mainColor]}/>
            <View style={styles.marksBlock}>
                <Picker
                    style={{width:'80%', color: [Colors.mainColor]}}
                    selectedValue={subj}
                    onValueChange={(itemValue, itemIndex) => {
                      setSubj(itemValue);
                    }}>
                    {subjTest.map((item) => {
                      return (
                        <Picker.Item label={item} value={item} key={item} />
                      );
                    })}
                </Picker>
                <TextInput 
                    keyboardType='decimal-pad'
                    style={[{
                        width: '19%',
                        textAlign:'center',
                    }, 
                    styles.input]}
                    onChangeText={setMark}
                    mark={mark}
                    placeholder="Балл"
                    placeholderTextColor={[Colors.mainColor]}/>
            </View>
                <LinearGradient end={{x: 1, y: 0}} colors={[[Colors.altDarkMainColor], [Colors.mainColor]]}  style={{borderRadius: 3, marginTop:7}}>
                    <TouchableOpacity onPress={addToTheBase} style={{
                      alignItems:'center',
                      justifyContent:'center',
                      }}>
                        <Text style={styles.addButton}>Добавить в базу</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
      <FlatList
        style={{flex:1, marginHorizontal:3, marginTop: 7 }}
        keyExtractor={(item) => item.name.toString()}
        data={studs}
        renderItem={({item}) =>  (
          <TouchableOpacity
            onLongPress={() => {
              deleteStudent(item.name)
            }}
            onPress={() => {
              displayStudMarks(item.name)
            }}
            activeOpacity={0.6}>
            <View style={styles.item}>
              <Text style={{
                width: '85%',
                color: "white",
                fontSize: 18,
                marginHorizontal: 5,
                }}>{item.name}</Text>
              <Text style={{
                width: '15%',
                color: "white",
                fontSize: 18,
                marginHorizontal: 5,
                }}>{item.mark}</Text>
            </View>
          </TouchableOpacity>
        )}/>  
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    paddingTop: 5,
    paddingHorizontal: 7,
    width:'100%'
  },
  addContainer: {
    margin: 2,
    backgroundColor: '#fffa',
    padding: 7,
    borderRadius: 5,
  },
  studInfo: {
    flexDirection: 'row', 
    backgroundColor: [Colors.altDarkMainColor]+'70', 
    borderBottomLeftRadius: 5, 
    borderBottomRightRadius:5
  },
  studInfoText: {
    color: "white",
    fontSize: 16,
    marginStart: 5,
  },
  marksBlock: {
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop:5,
  },
  input: {
    padding: 5,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: [Colors.altMainColor],
  },
  item: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 7,
    padding: 8,
    backgroundColor: [Colors.mainColor]+'90',
    borderRadius: 5,
  },
  addButton: {
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold', 
    letterSpacing: 0.5,
    margin: 7
  }
});
