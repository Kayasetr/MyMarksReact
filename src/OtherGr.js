import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Button, 
    TextInput, 
    FlatList, 
    BackHandler, 
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Dimensions
 } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import {Colors} from '../styles/global'
import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "./config/FirebaseConfig";
// import { ScrollView } from 'react-native-gesture-handler';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function OtherGr({navigation}) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [isLoading, setLoading] = useState(false)
    const [studs, setStuds] = useState([]);
    const [isOpened, setOpened] = useState(false);
    var studNames = [];
    const dbh = firebase.firestore();
    const showStudNames = () => {
        dbh
          .collection("ПИ-1-18")
          .get()
          .then(function (querySnapshot) {
            setStuds('')
            querySnapshot.forEach(function (doc) {
             let studName = doc.id.toString();
             studNames.push({name: studName})
             setStuds(studNames)
            });
            setLoading(false)
          })
          .catch(function (error) {
            alert("Ошибка: " + error);
          });
  }
  const backAction = () => {
    setStuds(studNames)
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
    BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const refreshHandler = () => {
      setOpened(false)
      setLoading(true)
      showStudNames()
  }

  const displayStudMarks = (item) => {  
    if(isOpened) {
      setOpened(false)
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
        }else {
            alert('Студент не найден')
        }
      })
      .catch(function (error) {
        alert("Ошибка: " + error);
      });
    }
  }

 useEffect(() => {
  showStudNames()
     }, []);

  return (
    <LinearGradient colors={[Colors.mainColor, Colors.altDarkMainColor, Colors.altMainColor]} style={{flex:1, width:'100%', height:'100%'}}>
      <StatusBar style="light" />
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
          <Text style={styles.buttonText}>
            Sign in with Facebook
          </Text>
        </LinearGradient>
            <FlatList
                style={{flex:1, marginHorizontal:3, marginTop: 7 }}
                keyExtractor={(item) => item.name.toString()}
                data={studs}
                refreshing={isLoading}
                onRefresh={refreshHandler}
                renderItem={({item}) =>  (
                <TouchableOpacity
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
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
    linearGradient: {
        opacity: 0.75,
        paddingHorizontal: 15,
        margin: 5,
        borderRadius: 5
      },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
    item: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 25,
        padding: 8,
        backgroundColor: [Colors.mainColor]+'7f',
        borderRadius: 2,
        borderColor: [Colors.mainColor],
    }
});
