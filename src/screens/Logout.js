// import { StyleSheet, Stack, TextInput} from 'react-native'
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Logout({ navigation }) {
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key')
    } catch (e) {
      console.log(e);
    }
  }
  const getData = async () => {
    const value = await AsyncStorage.getItem('@storage_Key')
    if (value === null) {
      navigation.navigate("LogIn1")
    }
  }
  React.useEffect(() => {
    removeData()
    getData()
  }, [])
  return (
    null
  );
}
