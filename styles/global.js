import {StyleSheet} from 'react-native';

export const Colors = {
   // mainColor: '#2F192B', 
    mainColor: '#282856', 
    altMainColor: '#3aba99', 
    altDarkMainColor: '#2799C5'
}

export const globalStyles = StyleSheet.create({
    color: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      margin: 5,
      padding: 5,
      borderStyle: "solid",
      borderBottomWidth: 2,
      borderBottomColor: "#3949ab",
    },
    item: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: 7,
      padding: 8,
      borderWidth: 1,
      backgroundColor: "#693ab7",
      borderRadius: 2,
      borderColor: "#693ab7",
    },
    title: {
      color: "white",
      fontSize: 18,
      marginStart: 5,
    },
    picker: {
      marginTop: 3,
      padding: 3,
      borderStyle: "solid",
      borderWidth: 2,
      borderColor: "#693ab7",
      borderRadius: 5,
    },
  });