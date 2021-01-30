import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  TextInput,
  Platform,
  Text,
  View,
} from "react-native";
import Navigator from './routes/drawer'
import { AddToTheBase } from "./src/AddToTheBase";
import * as firebase from "firebase";
import "firebase/firestore";
//import Manager from "./src/Manager";
//import LoginPage from "./src/LoginPage";
import { firebaseConfig } from "./src/config/FirebaseConfig";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default function App() {
  const [selectedValue, setSelectedValue] = useState("");
  const [studs, setStuds] = useState([]); 
  const [selectedStudent, setSelectedStudent] = useState("");
  // const dbh = firebase.firestore();
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(true);

  const showToast = ({ title }) => {
    if (Platform.OS == "android") {
      ToastAndroid.show(title, ToastAndroid.SHORT);
    } else if (Platform.OS == "ios") {
      alert(title);
    } else {
      alert(title);
    }
  };

  var DATA = [];

  const keke = () => {
    setName("");
    dbh
      .collection("ПИ-1-18")
      .doc(name)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          alert(doc.data());
          DATA = [doc.data().toString()];
          console.log("Document data:", doc.data());
        } else {
          alert("Пусто!");
        }
      });
  }
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Окно",
      "эу",
      [
        {
          text: "Отмена",
          onPress: () => Alert.alert("Отмена", "оекрп"),
        },
        { text: "OK", onPress: () => Alert.alert("ОК") },
      ],
      { cancelable: true }
    );

  const addToBase = (title) => {};

  const Item = ({ title }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedStudent(title);
        }}
      >
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => <Item title={item} />;

  const kek = () => {
    var studNames = [];
    dbh
      .collection("ПИ-1-18")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let studName = doc.id.toString();
          studNames.push(studName);
          //renderItem(studs)
          //alert(doc.id)
          setStuds(studNames);
        });
      })
      .catch(function (error) {
        alert("Ошибка: " + error);
      });
  };
  const [pickerGroups, setPickerGroups] = useState([]);
  const [data, setData] = useState([]);
  
  const getAllGroups = () => {
    fetch("")
      .then((response) => response.json())
      .then((json) => setPickerGroups(json.students))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };

 

 

  return(
      <Navigator/>
  )

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#3f2178" />
//       <Navbar title="My Marks (true)" />
//       <View style={{ padding: 10 }}>
//         {/* <AddToDo onSubmit={addToDo} /> */}
//         <Picker
//           style={styles.picker}
//           selectedValue={selectedValue}
//           onValueChange={(itemValue, itemIndex) => {
//             setSelectedValue(itemValue);
//           }}
//         >
//           {pickerGroups.map((item, index) => {
//             return (
//               <Picker.Item label={item.studentLogin} value={item} key={index} />
//             );
//           })}
//         </Picker>
//         <TextInput
//           style={styles.input}
//           onChangeText={setName}
//           name={name}
//           placeholder="Введите Имя"
//         />
//         {/* <Button title="Считать" onPress={getAllGroups} /> */}
//       </View>
//       <FlatList
//         style={{ margin: 5 }}
//         keyExtractor={(item) => item.id}
//         data={studs}
//         renderItem={renderItem}
//       />
//     </SafeAreaView>
//   );
 }

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eeeeee",
    height: "100%",
    width: '100%',
  },
  todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 3,
  },
  input: {
    margin: 5,
    padding: 5,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "#3949ab",
  },
  item: {
    marginTop: 7,
    padding: 12,
    borderWidth: 1,
    backgroundColor: "#693ab7",
    borderRadius: 2,
    borderColor: "#693ab7",
  },
  title: {
    color: "white",
    fontSize: 20,
    marginStart: 5,
  },
  picker: {
    marginVertical: 3,
    padding: 3,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#693ab7",
    borderRadius: 5,
  },
});
